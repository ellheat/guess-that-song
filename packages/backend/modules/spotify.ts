const SpotifyWebApi = require('spotify-web-api-node');

import { colors, config } from '../config';
import { PlaylistDataType, PlaylistItemType, PlaylistTracksDataType } from '../types/playlist';
import { TrackType } from '../types/track';

type PlaylistDetails = {
    href: string;
    name: string;
    tracks: {
        href: string;
        items: [];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    uri: string;
};
type SpotifyData = {
    body: {
        access_token: string;
        token_type: string;
        expires_in: number;
    };
    statusCode: number;
};

export class Spotify {
    private playlists: TrackType[][];
    private spotifyApi;
    private limit;

    constructor() {
        this.playlists = [];
        this.limit = 100;
        this.spotifyApi = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        });
    }

    getSpotifyToken = async () => {
        await this.spotifyApi.clientCredentialsGrant().then(
            (data: SpotifyData) => {
                console.log('token', data.body.access_token);
                this.spotifyApi.setAccessToken(data.body.access_token);
            },
            (err: object) => console.log('Something went wrong!', err),
        );
    };

    getPlaylists = () => this.playlists;

    fetchPlaylistDetails = async (playlistId: string): Promise<PlaylistDetails> => {
        return await this.spotifyApi
            .getPlaylist(playlistId, {
                fields: 'tracks, name, uri, href',
            })
            .then(
                (data: PlaylistDataType) => data.body,
                (err: any) => console.log('Something went wrong!', err),
            );
    };

    fetchPlaylistItems = (playlistId: string, offset: number) => {
        return this.spotifyApi
            .getPlaylistTracks(playlistId, {
                offset,
                limit: 100,
                fields: 'items(track(id, name, href, preview_url, artists, album))',
            })
            .then(
                (data: PlaylistTracksDataType) =>
                    data.body.items
                        .map(({ track }: PlaylistItemType) => ({
                            id: track.id,
                            artist: track.artists[0].name,
                            title: track.name,
                            album: track.album.name,
                            url: track.href,
                            previewUrl: track.preview_url,
                        }))
                        .filter((item) => item.previewUrl),
                (err: any) => console.log('Something went wrong!', err),
            );
    };

    fetchPlaylistAllItems = async (playlistId: string, index: number, playlistItemsCount: number) => {
        let offset = 0;
        while (offset <= playlistItemsCount) {
            const tracks = await this.fetchPlaylistItems(playlistId, offset);
            this.playlists[index] = this.playlists[index].concat(tracks);
            offset = offset + this.limit;
        }
    };

    fetchPlaylists = async () => {
        if (!this.spotifyApi.getAccessToken()) {
            await this.getSpotifyToken();
        }

        await Promise.all(
            config.playlists.map(async (playlistId: string, index: number) => {
                this.playlists.push([]);
                const playlistDetails = await this.fetchPlaylistDetails(playlistId);
                const playlistItemsCount = playlistDetails.tracks.total;

                await this.fetchPlaylistAllItems(playlistId, index, playlistItemsCount);

                console.log(colors.info(`------------ ${playlistDetails.name} ------------`));
                console.log(colors.info(`uri: ${playlistDetails.uri}`));
                console.log(colors.info(`tracks count: ${playlistItemsCount}`));

                console.log(colors.info(`Playlist tracks with preview url: ${this.playlists[index].length}`));
            }),
        );
    };
}
