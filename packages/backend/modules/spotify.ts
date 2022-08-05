const SpotifyWebApi = require('spotify-web-api-node');

import { colors } from '../config';
import { PlaylistDataType, PlaylistItemType, PlaylistTracksDataType } from '../types/playlist';
import { TrackType } from '../types/track';


type SpotifyData = {
	body: {
		access_token: string,
		expires_in: number
		refresh_token: string,
		scope: string,
		token_type: string,
	},
	statusCode: number
}


export class Spotify {
	private playlist;
	private spotifyApi;
	private limit;

	constructor() {
		this.playlist = new Array<TrackType>();
		this.limit = 100;
		this.spotifyApi = new SpotifyWebApi({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			redirectUri: 'http://localhost:8080/callback'
		});
	}

	getSpotifyToken = async () => {
		await this.spotifyApi.clientCredentialsGrant().then(
			(data: SpotifyData) => {
				this.spotifyApi.setAccessToken(data.body.access_token);
			},
			(err: object) => console.log('Something went wrong!', err)
		);
	}

	getSpotifyAuthorizationToken = async (authorizationCode: string) => {
		await this.spotifyApi.authorizationCodeGrant(authorizationCode).then(
			(data: SpotifyData) => {
				this.spotifyApi.setAccessToken(data.body.access_token);
				this.spotifyApi.setRefreshToken(data.body.refresh_token);
			},
			(err: object) => console.log('Something went wrong!', err)
		);
	}

	getAccessToken = async () => this.spotifyApi.getAccessToken();

	getPlaylist = () => this.playlist;

	fetchPlaylistAllItemsCount = async () => {
		return await this.spotifyApi.getPlaylist(process.env.PLAYLIST_ID, {
			fields: 'tracks',
		}).then(
			(data: PlaylistDataType) => data.body.tracks.total,
			(err: any) => console.log('Something went wrong!', err)
		);
	};

	fetchPlaylistItems = (offset: number) => {
		return this.spotifyApi.getPlaylistTracks(process.env.PLAYLIST_ID, {
			offset,
			limit: 100,
			fields: 'items',
		}).then(
			(data: PlaylistTracksDataType) =>
				data.body.items.map(({ track }: PlaylistItemType) => ({
					id: track.id,
					artist: track.artists[0].name,
					title: track.name,
					album: track.album.name,
					url: track.href,
					previewUrl: track.preview_url,
				})).filter(item => item.previewUrl),
			(err: any) => console.log('Something went wrong!', err)
		);
	};

	fetchPlaylistAllItems = async (playlistItemsCount: number) => {
		let offset = 0;
		while (offset <= playlistItemsCount) {
			const tracks = await this.fetchPlaylistItems(offset);
			this.playlist = this.playlist.concat(tracks);
			offset = offset + this.limit;
		}
	};

	fetchPlaylist = async () => {
		if (!this.spotifyApi.getAccessToken()) {
			await this.getSpotifyToken();
		}
		const playlistItemsCount = await this.fetchPlaylistAllItemsCount();
		console.log(colors.info(`Playlist tracks: ${playlistItemsCount}`));
		await this.fetchPlaylistAllItems(playlistItemsCount);
		console.log(colors.info(`Playlist tracks with preview url: ${this.playlist.length}`));
	}
}
