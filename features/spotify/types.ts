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
  artists: {
    id: string
    name: string
  }[]
}
