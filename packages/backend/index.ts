require('dotenv').config();

import express from 'express';
import os from 'os';
import { createServer } from 'http';
import { post, get } from 'request';
import { Server, Socket } from 'socket.io';
import querystring from 'querystring';

import { colors, Ports } from './config';
import { Characters, Spotify, Quiz } from './modules';
import { createConnection } from './events';

import { generateRandomString } from './utils/generateRandomString';

const app = express();
const httpServer = createServer();
const IPv4 = os.networkInterfaces().en0?.[1].address;
const socketIO = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:3000', `http://${IPv4}:3000`],
		credentials: true
	},
});

const io = socketIO.listen(app.listen(Ports.Sockets));

const characters = new Characters();
const spotify = new Spotify();

createConnection(io, characters, spotify);

app.listen(Ports.Base, async () => {
	console.log(colors.success(`IPv4 address: ${IPv4}:3000`));
	console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
	console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
	console.log('--------------------------------------');
	characters.createCharactersList();
	console.log(colors.success('Characters created'));
	await spotify.fetchPlaylist();
	console.log(colors.success('Playlist has been fetched'));
});

app.get('/login', (req, res) => {

	var state = generateRandomString(16);
	var scope = 'user-read-private user-read-email';

	const urlParams = new URLSearchParams({
		response_type: 'code',
		client_id: `${process.env.CLIENT_ID}`,
		scope,
		redirect_uri: 'http://localhost:8080/callback',
		state
	})

	res.redirect('https://accounts.spotify.com/authorize?' + urlParams.toString());
});

app.get('/callback', (req, res) => {

	const code = req.query.code || null;
	const state = req.query.state || null;

	if (state === null) {
		console.log('Spotify Error');
		const errorUrlParams = new URLSearchParams({ error: 'state_mismatch' });

		res.redirect('/#' + errorUrlParams.toString());
	} else {
    const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code,
			redirect_uri: 'http://localhost:3000',
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (Buffer.from(`${process.env.CLIENT_ID} : ${process.env.CLIENT_SECRET}`).toString('base64'))
		},
		json: true
    };

	post(authOptions, (error, response, body) => {
		const urlParams = new URLSearchParams();

    	if (!error && response.statusCode === 200) {

			const accessToken = body.access_token;
			const refreshToken = body.refresh_token;

			const options = {
				url: 'https://api.spotify.com/v1/me',
				headers: { 'Authorization': 'Bearer ' + accessToken },
				json: true
			};

			// use the access token to access the Spotify Web API
			get(options, function(error, response, body) {
				console.log(body);
			});

			// we can also pass the token to the browser to make requests from there
			urlParams.append('access_token', accessToken);
			urlParams.append('refresh_token', refreshToken);

			// res.redirect('http://localhost:3000' + urlParams.toString());
		} else {
			urlParams.append('error', 'invalid_token');
		}

		res.redirect('http://localhost:3000' + urlParams.toString());
    });
  }
});