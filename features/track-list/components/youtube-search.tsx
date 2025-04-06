"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, CircleCheck, Play, Pause } from "lucide-react";
import {
  searchYoutube,
  updateTrackYoutubeVideo,
  type YouTubeVideo,
} from "../actions";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import YouTube from "react-youtube";
import { refetchTracks } from "@/app/api";

interface YoutubeSearchProps {
  trackId: string;
  initialQuery: string;
  onSuccess?: () => void;
  currentYoutubeVideo: YouTubeVideo;
}

export function YoutubeSearch({
  trackId,
  initialQuery,
  currentYoutubeVideo,
  onSuccess,
}: YoutubeSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [searching, setSearching] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    currentYoutubeVideo?.id || null
  );
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setSearching(true);
      const results = await searchYoutube(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to search YouTube:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectVideo = async (videoId: string) => {
    try {
      setUpdating(true);
      setSelectedVideoId(videoId);
      await updateTrackYoutubeVideo(trackId, videoId);
      router.refresh(); // Refresh the page data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to update track:", error);
    } finally {
      setUpdating(false);
    }
  };

  const togglePreview = (videoId: string) => {
    if (previewVideoId === videoId) {
      setPreviewVideoId(null);
    } else {
      setPreviewVideoId(videoId);
    }
  };

  useEffect(() => {
    // Search on initial load
    handleSearch();
  }, []);

  // Combine current video with search results, but avoid duplicates
  const allVideos = [
    currentYoutubeVideo,
    ...searchResults.filter((video) => video.id !== currentYoutubeVideo?.id),
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube videos..."
          className="flex-1 bg-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          className="bg-input text-foreground"
          onClick={handleSearch}
          disabled={searching}
        >
          {searching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {searching ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-4">
          {allVideos.length > 0 ? (
            allVideos.map((video) => (
              <div key={video.id} className="space-y-2">
                <Card
                  className={`relative flex flex-row items-center gap-4 rounded-md border p-3 hover:brightness-105 transition-colors ${
                    selectedVideoId === video.id ? "border-primary" : ""
                  }`}
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => togglePreview(video.id)}
                  >
                    <Image
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.title}
                      className="rounded"
                      width={150}
                      height={100}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded opacity-0 hover:opacity-100 transition-opacity">
                      {previewVideoId === video.id ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{video.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {/* {video.description} */}
                    </p>

                    <div className="flex justify-between items-center">
                      <Button
                        variant={
                          currentYoutubeVideo?.id === video.id
                            ? "secondary"
                            : "outline"
                        }
                        size="sm"
                        className={`mt-2 w-full hover:cursor-pointer ${
                          currentYoutubeVideo?.id === video.id
                            ? "bg-card-foreground hover:bg-card-foreground/80"
                            : "hover:bg-card-foreground"
                        }`}
                        onClick={() => handleSelectVideo(video.id)}
                        disabled={updating && selectedVideoId === video.id}
                      >
                        {updating && selectedVideoId === video.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : currentYoutubeVideo?.id === video.id ? (
                          <>
                            <CircleCheck className="h-3 w-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>

                {previewVideoId === video.id && (
                  <div className="rounded-md overflow-hidden">
                    <YouTube
                      videoId={video.id}
                      opts={{
                        width: "100%",
                        height: "250",
                        playerVars: {
                          autoplay: 1,
                          modestbranding: 1,
                        },
                      }}
                      onEnd={() => setPreviewVideoId(null)}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
