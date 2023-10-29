require('dotenv').config();

import express from 'express';
import os from 'os';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { colors, Ports } from './config';
import { Characters, Spotify, Quiz } from './modules';
import { createConnection } from './events';

const app = express();
const httpServer = createServer();
const IPv4 = os.networkInterfaces().en0?.[1].address;
const socketIO = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173', `http://${IPv4}:5173`],
        credentials: true,
    },
});

const io = socketIO.listen(app.listen(Ports.Sockets));

const characters = new Characters();
const spotify = new Spotify();

createConnection(io, characters, spotify);

app.listen(Ports.Base, async () => {
    console.log(colors.success(`IPv4 address: ${IPv4}:5173`));
    console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
    console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
    console.log('--------------------------------------');
    characters.createCharactersList();
    console.log(colors.success('Characters created'));
    await spotify.fetchPlaylists();
    console.log(colors.success('Playlists have been fetched'));
});
