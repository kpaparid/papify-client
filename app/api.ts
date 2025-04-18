import {
  AlbumType,
  ArtistProfileType,
  GoogleDriveTrack,
  PlaylistType,
  SearchResultType,
  YoutubeTrack,
} from "@/features/spotify/types"
import { TrackData } from "@/features/track-list/components/track-item"

// const API_URL = process.env.API_URL+'/api'
const API_URL = "https://papify-backend.onrender.com/api"
// const API_URL = "http://localhost:5000/api"
export const fetchGoogleDriveTracks = (
  tags?: string[]
): Promise<{
  data: GoogleDriveTrack[]
  date: number
}> =>
  fetch(API_URL + "/google-drive/tracks", { next: { revalidate: 60, tags } })
    .then((res) => res.json())
    .then((data) => ({
      data,
      date: Date.now(), // timestamp in milliseconds
    }))

export const fetchYoutubeTracks = (
  tags?: string[]
): Promise<{
  data: YoutubeTrack[]
  date: number
}> =>
  fetch(API_URL + "/youtube-tracks", { next: { revalidate: 60, tags } })
    .then((res) => res.json())
    .then((data) => ({
      data,
      date: Date.now(), // timestamp in milliseconds
    }))

export const fetchSavedTracks = (tags?: string[]): Promise<TrackData[]> =>
  fetch(API_URL + "/tracks", { next: { revalidate: 60, tags } }).then((res) =>
    res.json()
  )
export const refetchTracks = (tags?: string[]): Promise<TrackData[]> =>
  fetch(API_URL + "/tracks", { next: { tags } }).then((res) => res.json())
export const fetchSpotifySearch = (
  query: string,
  tags?: string[]
): Promise<SearchResultType> =>
  fetch(API_URL + "/spotify/search?query=" + query, { next: { tags } }).then(
    (res) => res.json()
  )
export const removeGoogleDriveTrack = (
  id: string,
  tags?: string[]
): Promise<GoogleDriveTrack> =>
  fetch(API_URL + "/google-drive/tracks/" + id, {
    method: "DELETE",
    next: { tags },
  }).then((res) => res.json())
export const fetchSpotifyAlbum = (
  id: string,
  tags?: string[]
): Promise<AlbumType> =>
  fetch(API_URL + "/spotify/album/" + id, { next: { tags } }).then((res) =>
    res.json()
  )
export const fetchSpotifyArtist = (
  id: string,
  tags?: string[]
): Promise<ArtistProfileType> =>
  fetch(API_URL + "/spotify/artist/" + id, { next: { tags } }).then((res) =>
    res.json()
  )
export const fetchSpotifyPlaylist = (
  id: string,
  tags?: string[]
): Promise<PlaylistType> =>
  fetch(API_URL + "/spotify/playlist/" + id, { next: { tags } }).then((res) =>
    res.json()
  )

export const toggleSaveSpotifyTrack = (
  id: string,
  save: boolean,
  tags?: string[]
) => {
  return save
    ? fetch(API_URL + `/tracks/${id}/save`, { method: "POST", next: { tags } })
    : fetch(API_URL + `/tracks/${id}/delete`, {
        method: "DELETE",
        next: { tags },
      })
}
