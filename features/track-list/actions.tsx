"use server";

import { revalidatePath } from "next/cache";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  description: string;
}

export async function searchYoutube(query: string): Promise<YouTubeVideo[]> {
  // This requires a YouTube Data API key from Google Cloud Platform
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("YouTube API key is not configured");
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        query
      )}&type=video&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.items[0]);
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    }));
  } catch (error) {
    console.error("Error searching YouTube:", error);
    throw error;
  }
}

export async function updateTrackYoutubeVideo(
  trackId: string,
  youtubeId: string
): Promise<void> {
  // This is where you would update your database with the new YouTube ID
  try {
    // Example API call to your backend
    const response = await fetch(`/api/tracks/${trackId}/youtube`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ youtubeId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update track: ${response.statusText}`);
    }

    // Revalidate the tracks page to show updated data
    revalidatePath("/tracks");
  } catch (error) {
    console.error("Error updating track:", error);
    throw error;
  }
}
