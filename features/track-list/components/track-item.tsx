"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Play,
  ExternalLink,
  Pause,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { formatDate, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import YouTube from "react-youtube";

interface Artist {
  _id: string;
  id: string;
  name: string;
  image?: string;
}

export interface TrackData {
  storage?: {
    storageId: string;
    name: string;
    size: number;
    createdTime: string;
  };
  spotify: {
    album: {
      id: string;
      name: string;
      artists: Artist[];
      images: string[];
      release_date: string;
    };
    spotifyId: string;
    name: string;
    popularity: number;
    duration_ms: number;
    artists: Artist[];
  };
  _id: string;
  id: string;
  collectionIds: string[];
  downloading: boolean;
  youtube: {
    query: string;
    youtubeId: string;
    title: string;
    publish_date: string;
    images: string[];
    description: string;
    _id: string;
  }[];
  __v: number;
  downloadTime: string;
}

export default function TrackItem(track: TrackData) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);

  const togglePlay = (trackId: string) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  }

  const handleEdit = () => {
    console.log("Edit track:", track._id);
    // Implement edit functionality
  };

  const handleDelete = () => {
    console.log("Delete track:", track._id);
    // Implement delete functionality
  };

  const toggleYoutubePlayer = () => {
    setShowYoutubePlayer(!showYoutubePlayer);
  };

  return (
    <Card key={track._id} className="overflow-hidden relative p-8">
      <div className="flex items-center gap-4 absolute right-3 top-4">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit} asChild>
                  <Link href={`/edit/${track._id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                  asChild
                >
                  <Link href={`/tracks/edit/${track._id}`}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <CardContent className="p-0 font-semibold">
        <div className="flex flex-col items-center md:flex-row">
          {/* Album Art with play overlay */}
          <div className="relative w-full md:w-48 h-48">
            <div
              className="relative h-full w-full cursor-pointer group"
              onClick={toggleYoutubePlayer}
            >
              <Image
                src={
                  // track.youtube[0].images[0] ||
                  track.spotify.album.images[0] ||
                  "/placeholder.svg?height=300&width=300" ||
                  "/placeholder.svg"
                }
                alt={track.spotify.album.name}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                {showYoutubePlayer ? (
                  <Pause className="h-12 w-12 text-white" />
                ) : (
                  <Play className="h-12 w-12 text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Track Details */}
          <div className="pl-8 flex-1">
            <div className="flex flex-col gap-0 w-full">
              <h2 className="text-xl font-semibold">{track.spotify.name}</h2>
              <div>
                <div className="flex items-center gap-2">
                  {track.spotify.artists.map((artist, index) => (
                    <span key={artist._id} className="text-muted-foreground">
                      {artist.name}
                      {index < track.spotify.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2">
                  <div className="text-sm text-muted-foreground">
                    Album: {track.spotify.album.name}{" "}
                    {`(${new Date(
                      track.spotify.album.release_date
                    ).getFullYear()})`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Spotify: {track.spotify.spotifyId}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Storage</h3>
                {track.storage ? (
                  <div className="text-sm text-muted-foreground mt-1">
                    <div>File: {track.storage.name}</div>
                    <div>
                      Added:{" "}
                      {formatDistanceToNow(
                        new Date(track.storage.createdTime),
                        { addSuffix: true }
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>File: Not downloaded yet</div>
                      <div>
                        Downloading:{" "}
                        <span className="capitalize">
                          {track.downloading.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {track.youtube.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    YouTube
                    <a
                      href={`https://www.youtube.com/watch?v=${track.youtube[0].youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {track.youtube[0].title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {formatDate(track.youtube[0].publish_date, "dd.MM.yyyy")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* YouTube Player */}
        {showYoutubePlayer && track.youtube && track.youtube.length > 0 && (
          <div className="mt-4 rounded-md overflow-hidden">
            <YouTube
              videoId={track.youtube[0].youtubeId}
              opts={{
                width: "100%",
                height: "300",
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                },
              }}
              onEnd={() => setShowYoutubePlayer(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
