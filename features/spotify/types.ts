export interface GoogleDriveTrack {
  id: string
  name: string
  size: number
  createdTime: string
  collectionIds?: string[]
  isSaved: boolean
  appProperties: {
    spotifyId: string
    name: string
    artists: string
    album: string
    image: string
    youtubeId: string
  }
}
export interface SearchAlbumType {
  id: string
  name: string
  images: string[]
  release_date: string
  total_tracks: number
  artists: {
    id: string
    name: string
  }[]
}
export interface SearchArtistType {
  id: string
  name: string
  followers: number //
  genres: string[]
  images: string[] //
  popularity: number
  score: number
}
export interface SearchPlaylistType {
  id: string
  name: string
  images: string[]
  score: number
  total_tracks: number
}
export interface SearchTopResultType {
  id: string
  name: string
  images: string[]
  score: number
  genres: string[]
  followers: number
  isSaved: boolean
  popularity: number
  duration_ms?: number
  artists: {
    id: string
    name: string
  }[]
  album?: {
    id: string
    name: string
    release_date: string
    total_tracks: number
    images: string[]
    artists: {
      id: string
      name: string
    }[]
  }
  type: "album" | "artist" | "playlist" | "track"
}
export interface SearchTrackType {
  id: string
  name: string
  popularity: number
  isSaved: boolean
  artists: {
    id: string
    name: string
  }[]
  score: number
  album: {
    id: string
    name: string
    images: string[]
    release_date: string
    total_tracks: number
    artists: {
      id: string
      name: string
    }[]
  }
}
export interface SearchResultType {
  id: string //query
  albums: SearchAlbumType[]
  artists: SearchArtistType[]
  playlists: SearchPlaylistType[]
  tracks: SearchTrackType[]
  topResult: SearchTopResultType
}

export interface AlbumType {
  id: string
  total_tracks: number
  images: string[]
  name: string
  release_date: string
  isSaved: boolean
  artists: {
    id: string
    name: string
  }[]
  tracks: AlbumTracksType[]
}
export interface AlbumTracksType {
  id: string
  name: string
  duration_ms: number
  isSaved: boolean
  artists: {
    id: string
    name: string
  }[]
}

export interface ArtistProfileDetailsType {
  id: string
  name: string
  images: string[]
  genres: string[]
  followers: number
  popularity: number
}
export interface ArtistProfilePlaylistType {
  id: string
  name: string
  images: string[]
  total_tracks: number
  description: string
}
export interface ArtistProfileTopTracksType {
  id: string
  name: string
  duration_ms: number
  popularity: number
  isSaved: boolean
  album: {
    id: string
    name: string
    images: string[]
    release_date: string
    total_tracks: number
    artists: {
      id: string
      name: string
    }[]
  }
  artists: {
    id: string
    name: string
  }[]
}
export interface ArtistProfileTracksType {
  id: string
  name: string
  duration_ms: number
  isSaved: boolean
  popularity: number
  album: {
    id: string
    name: string
    images: string[]
    release_date: string
    total_tracks: number
    artists: {
      id: string
      name: string
    }[]
  }[]
  artists: {
    id: string
    name: string
  }[]
}
export interface ArtistProfileAlbumsType {
  id: string
  name: string
  images: string[]
  release_date: string
  total_tracks: number
  popularity: number
  label: string
  tracks: {
    isSaved: boolean
    id: string
    name: string
    duration_ms: number
    artists: {
      id: string
      name: string
    }[]
  }[]
  artists: {
    id: string
    name: string
  }[]
}
export interface ArtistProfileType {
  id: string
  artist: ArtistProfileDetailsType
  playlists: ArtistProfilePlaylistType[]
  topTracks: ArtistProfileTopTracksType[]
  tracks: ArtistProfileTracksType[]
  albums: ArtistProfileAlbumsType[]
}

export interface PlaylistType {
  id: string
  name: string
  images: string[]
  owner: {
    name: string
    id: string
    type: string
  }
  total_tracks: number
  tracks: PlaylistTracksType[]
}
export interface PlaylistTracksType {
  id: string
  name: string
  duration_ms: number
  popularity: number
  isSaved: boolean
  artists: {
    id: string
    name: string
  }[]
  album: {
    id: string
    name: string
    images: string[]
    release_date: string
    total_tracks: number
    artists: {
      id: string
      name: string
    }[]
  }[]
}
export interface YoutubeTrack {
  _id: {
    $oid: string
  }
  query: string
  spotifyId: string
  youtubeId: string
  title: string
  publish_date: {
    $date: string
  }
  images: string[]
  description: string
  __v: number
  collectionIds?: string[]
  isSaved: boolean
}
