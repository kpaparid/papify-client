import {
  AlbumType,
  ArtistProfileType,
  GoogleDriveTrack,
  PlaylistType,
  SearchResultType,
} from "@/features/spotify/types";
import { TrackData } from "@/features/track-list/components/track-item";

// const API_URL = process.env.API_URL+'/api'
const API_URL = "https://papify-backend.onrender.com/api";
// const API_URL = "http://localhost:5000/api"
export const fetchGoogleDriveTracks = (): Promise<{
  data: GoogleDriveTrack[];
  date: number;
}> =>
  fetch(API_URL + "/google-drive/tracks", { next: { revalidate: 60 } })
    .then((res) => res.json())
    .then((data) => ({
      data,
      date: Date.now(), // timestamp in milliseconds
    }));

export const fetchSavedTracks = (): Promise<TrackData[]> =>
  fetch(API_URL + "/tracks", { next: { revalidate: 60 } }).then((res) =>
    res.json()
  );
export const refetchTracks = (): Promise<TrackData[]> =>
  fetch(API_URL + "/tracks").then((res) => res.json());
export const fetchSpotifySearch = (query: string): Promise<SearchResultType> =>
  fetch(API_URL + "/spotify/search?query=" + query).then((res) => res.json());
export const removeGoogleDriveTrack = (id: string): Promise<GoogleDriveTrack> =>
  fetch(API_URL + "/google-drive/tracks/" + id, { method: "DELETE" }).then(
    (res) => res.json()
  );
export const fetchSpotifyAlbum = (id: string): Promise<AlbumType> =>
  fetch(API_URL + "/spotify/album/" + id).then((res) => res.json());
export const fetchSpotifyArtist = (id: string): Promise<ArtistProfileType> =>
  fetch(API_URL + "/spotify/artist/" + id).then((res) => res.json());
export const fetchSpotifyPlaylist = (id: string): Promise<PlaylistType> =>
  fetch(API_URL + "/spotify/playlist/" + id).then((res) => res.json());

export const toggleSaveSpotifyTrack = (id: string, save: boolean) => {
  console.log({ id, save });
  return   save
  ? fetch(API_URL + `/tracks/${id}/save`, { method: "POST" })
  : fetch(API_URL + `/tracks/${id}/delete`, { method: "DELETE" });
}
