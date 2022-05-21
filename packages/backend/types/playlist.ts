export type PlaylistDataType = {
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

export type PlaylistTracksDataType = {
  body: {
    items: PlaylistItemType[]
  },
  statusCode: number
}

export type PlaylistItemType = {
  added_at: string,
  added_by: {
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    type: string,
    uri: string
  },
  track: PlaylistTrackType,
}

type PlaylistTrackType = {
  album: {
    album_type: string,
    artists: [object][],
    available_markets: string[],
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    images: [object[], object[], object[]],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
  },
  artists: [
    {
      external_urls: object[],
      href: string,
      id: string,
      name: string,
      type: string,
      uri: string
    }
  ],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  episode: boolean,
  explicit: boolean,
  external_ids: {
    isrc: string
  },
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  is_local: boolean,
  name: string,
  popularity: number,
  preview_url: string,
  track: boolean,
  track_number: number,
  type: string,
  uri: string
}
