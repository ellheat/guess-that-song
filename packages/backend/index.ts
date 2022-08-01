require('dotenv').config();

import axios from 'axios';
import express from 'express';
import os from 'os';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

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
	const redirectUri = 'http://localhost:8080/callback';
	const state = generateRandomString(16);
	const scope = 'user-read-playback-position user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-read user-read-email playlist-read-private playlist-read-collaborative';

	const urlParams = new URLSearchParams({
		response_type: 'code',
		client_id: `${process.env.CLIENT_ID}`,
		scope,
		redirect_uri: redirectUri,
		state
	})

	res.redirect(`https://accounts.spotify.com/authorize?${urlParams.toString()}`);
});

app.get('/callback', async (req, res) => {
	const code = req.query.code || null;
	const state = req.query.state || null;

  spotify.getSpotifyAuthorizationToken(`${code}`);

	// if (state === null) {
	// 	console.log('Spotify Error');
	// 	const errorUrlParams = new URLSearchParams({ error: 'state_mismatch' });

	// 	res.redirect(`/#${errorUrlParams.toString()}`);
	// } else {
	// 	const clientSecrets = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
	// 	const auth = `Basic ${Buffer.from(clientSecrets).toString('base64')}`;

	// 	const data = new URLSearchParams({
  //     code: `${code}`,
  //     redirect_uri: 'http://localhost:3000',
	// 		grant_type: 'authorization_code',
	// 	}).toString();

  //   axios.post('https://accounts.spotify.com/api/token', data, {
  //     headers: {
  //       'Authorization': `Basic ${auth}`,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).then((response) => {
  //     console.log('response', response);
  //   }).catch(error => {
	// 		console.log('error', error);
	// 	});


		// axios({
		// 	method: 'post',
		// 	url: 'https://accounts.spotify.com/api/token',
		// 	data,
		// 	headers: {
		// 		Authorization: auth
		// 	}
		// }).then(response => {
		// 	const urlParams = new URLSearchParams();

    //   console.log('response', response);

		// 	if (response.status === 200) {
		// 		urlParams.append('access_token', response.data.access_token);
		// 	} else {
		// 		console.log('response.data', response);
		// 		urlParams.append('error', 'invalid_token');
		// 	}

		// })
		// .catch(error => {
		// 	console.log('error', error);
		// });
  // }
});
