require('dotenv').config();

import express from 'express';
import cors from 'cors';
import os from 'os';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { colors, Ports } from './config';
import { Characters, Spotify } from './modules';
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

app.use(cors());

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
	const scope = 'streaming user-read-email user-read-private';

	const urlParams = new URLSearchParams({
		response_type: 'code',
		client_id: `${process.env.CLIENT_ID}`,
		scope,
		redirect_uri: redirectUri,
		state
	});

	res.redirect(`https://accounts.spotify.com/authorize?${urlParams.toString()}`);
});

app.get('/callback', async (req, res) => {
	const code = req.query.code || null;
	const redirectUri = 'http://localhost:3000';

  	spotify.getSpotifyAuthorizationToken(`${code}`).then(() => {
		res.redirect(redirectUri);
	});
});

app.get('/token', async (req, res) => {
	spotify.getAccessToken().then((accessToken) => {
		res.json({ accessToken });
	});
});
