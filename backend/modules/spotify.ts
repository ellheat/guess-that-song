const SpotifyWebApi = require('spotify-web-api-node');
import { track } from '../types/track';

export type PlaylistType = {
  name: string;
  color: string;
}

type spotifyData = {
  body: {
    access_token: string,
    token_type: string,
    expires_in: number
  },
  statusCode: number
}

type playlistData = {
  body: {
    tracks: {
      href: string,
      items: [],
      limit: number,
      next: string | null,
      offset: number,
      previous: string | null,
      total: number
    }
  },
  statusCode: number
}

type playlistTracksData = {
  body: {
    items: {
      added_at: string,
      added_by: object[],
      is_local: boolean,
      primary_color: string | null,
      track: track[],
      video_thumbnail: object[]
    }[]
  },
  statusCode: number
}



export class Spotify {
  private playlist;
  private spotifyApi;

  constructor() {
    this.playlist = new Array<PlaylistType>();
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  }

  getSpotifyToken = async () => {
    await this.spotifyApi.clientCredentialsGrant().then(
      (data: spotifyData) => {
        console.log('data', data);
        this.spotifyApi.setAccessToken(data.body.access_token);
      },
      (err: object) => {
        console.log('Something went wrong!', err); // eslint-disable-line
      }
    );
  }

  fetchPlaylistAllItemsCount = async () => {
    return await this.spotifyApi.getPlaylist(process.env.PLAYLIST_ID, {
      fields: 'tracks',
    }).then(
      (data: playlistData) => data.body.tracks.total,
      (err: any) => {
        console.log('Something went wrong!', err); // eslint-disable-line
      }
    );
  };

  fetchPlaylistItems = (offset: number) => {
    return this.spotifyApi.getPlaylistTracks(process.env.PLAYLIST_ID, {
      offset: 0,
      limit: 100,
      fields: 'items',
    }).then(
      (data: playlistTracksData) => {
        // @ts-ignore
        console.log('asd1213123', data.body.items[0].track);
        const trackArrayWithShortInfo = data.body.items.map((item: any) => {
          console.log('item', item);
          return {
            id: item.track.id,
            artist: item.track.artists[0].name,
            title: item.track.name,
            album: item.track.album.name,
            url: item.track.href,
            previewUrl: item.track.preview_url,
          };
        });
        // TRACKS_ARRAY = concat(TRACKS_ARRAY, trackArrayWithShortInfo);
        // resolve();
      },
      (err: any) => {
        console.log('Something went wrong!', err); // eslint-disable-line
      }
    );
  };

  fetchPlaylist = async () => {
    const playlistItemsCount = await this.fetchPlaylistAllItemsCount();
    console.log(`All playlist tracks: ${playlistItemsCount}`); // eslint-disable-line
    await this.fetchPlaylistItems(playlistItemsCount);
    // await getPlaylistAllItems(totalPlaylistTracks);
    // console.log(`Downloaded tracks: ${getPlaylist().length}`.information); // eslint-disable-line
  };

  get = async () => {
    if (!this.spotifyApi.getAccessToken()) {
      await this.getSpotifyToken();
    }
    await this.fetchPlaylist();
    // const animals = <string[]>characters.characters;
    // const adjectives = <string[]>characters.adjectives;
    // const colors = <string[]>characters.colors;
    //
    // animals.forEach(animal => {
    //   const randomColor = colors[random(0, colors.length - 1)];
    //   const randomAdjective = adjectives[random(0, adjectives.length - 1)];
    //
    //   this.list.push({
    //     name: `${randomAdjective} ${animal}`,
    //     color: randomColor,
    //   });
    // });
  }
}
