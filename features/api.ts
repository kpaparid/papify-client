import {
  AlbumType,
  ArtistProfileType,
  GoogleDriveTrack,
  PlaylistType,
  SearchResultType,
  YoutubeTrack,
} from "@/features/spotify/types"
import { YoutubeQueryVideo, YouTubeVideo } from "@/features/track-list/actions"
import { TrackData } from "@/features/track-list/components/track-item"

// const API_URL = process.env.API_URL+'/api'
const API_URL = "https://papify-backend.onrender.com/api"
// const API_URL = "http://localhost:5000/api"
export const fetchCategories = (
  tags?: string[]
): Promise<{ name: string; tracks: unknown[] }[]> =>
  fetch(API_URL + "/collections", { next: { tags } }).then((res) => res.json())
export const deleteAllTracks = (tags?: string[]): Promise<void> =>
  fetch(API_URL + "/tracks/delete", {
    method: "DELETE",
    next: { tags },
  }).then((res) => res.json())
export const deleteCategory = (category: string): Promise<void> =>
  fetch(API_URL + `/collections/${category}`, { method: "DELETE" }).then(
    (res) => res.json()
  )
export const addCategory = (category: string, tags?: string[]): Promise<void> =>
  fetch(API_URL + `/collections/${category}`, {
    method: "POST",
    next: { tags },
  }).then((res) => res.json())

export const editCategory = (
  category: string,
  newCategory: string
): Promise<void> => {
  console.log("Editing category2:", category, "to", newCategory)
  return fetch(API_URL + `/collections/${category}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newCategory }),
  }).then((res) => res.json())
}
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

export const fetchSavedTracks = (
  tags: string[] = ["savedTracks"]
): Promise<{ data: TrackData[]; date: number }> =>
  fetch(API_URL + "/tracks", { next: { revalidate: 60, tags } })
    .then((res) => res.json())
    .then((data) => ({
      data,
      date: Date.now(), // timestamp in milliseconds
    }))
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

export const saveSpotifyTracks = (ids: string[], tags?: string[]) =>
  fetch(API_URL + `/tracks/${ids.join(",")}/save`, {
    method: "PUT",
    next: { tags },
  }).then((res) => res.json())

export const fetchMoreYoutubeTracks = (
  query: string
): Promise<YoutubeTrack[]> =>
  fetch(API_URL + `/youtube-tracks/${query}/alternatives`).then((res) =>
    res.json()
  )

export const fetchYoutubeSearch = (query: string): Promise<YoutubeQueryVideo> =>
  fetch(API_URL + `/youtube/tracks?${query}`).then((res) => res.json())

export const removeYoutubeQuery = (id: string) =>
  fetch(API_URL + `/youtube/tracks/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  )

export const editYoutubeQuery = (
  id: string,
  body: {
    youtubeId?: string
    title?: string
    publish_date?: string
    images?: string[]
    description?: string
  }
) => {
  // console.log(id, body);
  return fetch(API_URL + `/youtube/tracks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())
}

export const fetchGoogleStorage = (): Promise<{
  totalStorageBytes: number
  usedStorageBytes: number
  usedInDriveBytes: number
  usedInTrashBytes: number
}> => fetch(API_URL + "/google-drive/storage").then((res) => res.json())
