const SpotifyWebApi = require('spotify-web-api-node');

import { PlaylistDataType, PlaylistItemType, PlaylistTracksDataType } from '../types/playlist';
import { TrackType } from '../types/track';


type SpotifyData = {
  body: {
    access_token: string,
    token_type: string,
    expires_in: number
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
    });
  }

  getSpotifyToken = async () => {
    await this.spotifyApi.clientCredentialsGrant().then(
      (data: SpotifyData) => this.spotifyApi.setAccessToken(data.body.access_token),
      (err: object) => console.log('Something went wrong!', err)
    );
  }

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
      (data: PlaylistTracksDataType) => {
        return data.body.items.map((item: PlaylistItemType) => ({
          id: item.track.id,
          artist: item.track.artists[0].name,
          title: item.track.name,
          album: item.track.album.name,
          url: item.track.href,
          previewUrl: item.track.preview_url,
        })).filter(item => item.previewUrl);
      },
      (err: any) => {
        console.log('Something went wrong!', err);
      }
    );
  };

  fetchAllPlaylistItems = async (playlistItemsCount: number) => {
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
    console.log(`Playlist tracks: ${playlistItemsCount}`);
    await this.fetchAllPlaylistItems(playlistItemsCount);
    console.log(`Playlist tracks with preview url: ${this.playlist.length}`);
  }
}
