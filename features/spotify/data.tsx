// Mock data generator for Spotify-like search results

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  duration: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
}

interface Playlist {
  id: string;
  name: string;
  creator: string;
  imageUrl: string;
}

interface TopResultItem {
  id: string;
  name: string;
  type: "Artist" | "Album" | "Playlist" | "Song";
  imageUrl: string;
}

interface SearchResults {
  topResult: TopResultItem;
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];
}

// Generate a deterministic but seemingly random number based on a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a random color for placeholder images
function getRandomColor(seed: string): string {
  const hash = hashString(seed);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// Generate placeholder image URL with a specific color
function getPlaceholderImage(seed: string, width = 300, height = 300): string {
  const color = getRandomColor(seed).replace("#", "");
  return `/placeholder.svg?height=${height}&width=${width}`;
}

export function getMockDataForQuery(query: string): SearchResults {
  // Use the query to seed our "random" data generation
  const seed = query || "default";
  const hash = hashString(seed);

  // Generate tracks
  const tracks: Track[] = Array.from({ length: 20 }, (_, i) => {
    const trackSeed = `${seed}-track-${i}`;
    const trackHash = hashString(trackSeed);
    const minutes = 2 + (trackHash % 4);
    const seconds = trackHash % 60;

    return {
      id: `track-${trackHash}`,
      title: `${query} ${i === 0 ? "Hit" : "Track"} ${i + 1}`,
      artist:
        i % 3 === 0 ? "The Weeknd" : i % 3 === 1 ? "Taylor Swift" : "Drake",
      album: `${query} Album ${Math.floor(i / 4) + 1}`,
      albumImageUrl: getPlaceholderImage(`${trackSeed}-album`),
      duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    };
  });

  // Generate albums
  const albums: Album[] = Array.from({ length: 12 }, (_, i) => {
    const albumSeed = `${seed}-album-${i}`;
    const albumHash = hashString(albumSeed);
    const year = 2010 + (albumHash % 14);

    return {
      id: `album-${albumHash}`,
      title: `${query} ${i === 0 ? "Greatest Hits" : `Album ${i + 1}`}`,
      artist:
        i % 4 === 0
          ? "The Weeknd"
          : i % 4 === 1
          ? "Taylor Swift"
          : i % 4 === 2
          ? "Drake"
          : "Billie Eilish",
      year: year.toString(),
      imageUrl: getPlaceholderImage(`${albumSeed}-cover`),
    };
  });

  // Generate playlists
  const playlists: Playlist[] = Array.from({ length: 10 }, (_, i) => {
    const playlistSeed = `${seed}-playlist-${i}`;
    const playlistHash = hashString(playlistSeed);

    return {
      id: `playlist-${playlistHash}`,
      name:
        i === 0
          ? `${query} Mix`
          : i === 1
          ? `${query} Vibes`
          : `${query} Playlist ${i}`,
      creator:
        i % 3 === 0 ? "Spotify" : i % 3 === 1 ? "Music Fan" : "DJ Awesome",
      imageUrl: getPlaceholderImage(`${playlistSeed}-cover`),
    };
  });

  // Generate top result (alternating between types based on query)
  const topResultType =
    hash % 4 === 0
      ? "Artist"
      : hash % 4 === 1
      ? "Album"
      : hash % 4 === 2
      ? "Playlist"
      : "Song";

  const topResult: TopResultItem = {
    id: `top-${hash}`,
    name:
      topResultType === "Artist"
        ? hash % 3 === 0
          ? "The Weeknd"
          : hash % 3 === 1
          ? "Taylor Swift"
          : "Drake"
        : topResultType === "Album"
        ? `${query} Album`
        : topResultType === "Playlist"
        ? `${query} Mix`
        : `${query} Hit`,
    type: topResultType,
    imageUrl: getPlaceholderImage(`${seed}-top-result`),
  };

  return {
    topResult,
    tracks,
    albums,
    playlists,
  };
}
