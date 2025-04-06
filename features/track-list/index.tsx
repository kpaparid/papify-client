"use client";

import { useEffect, useState } from "react";
import TrackItem, { type TrackData } from "./components/track-item";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { refetchTracks } from "@/app/api";

export default function MusicTrackList({ tracks }: { tracks: TrackData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredTracks = tracks.filter(
    (track) =>
      track.spotify.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.spotify.artists.some((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.spotify.name.localeCompare(b.spotify.name);
      case "artist":
        return a.spotify.artists[0]?.name.localeCompare(
          b.spotify.artists[0]?.name || ""
        );
      case "popularity":
        return b.spotify.popularity - a.spotify.popularity;
      case "duration":
        return a.spotify.duration_ms - b.spotify.duration_ms;
      default:
        return 0;
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("refetching");
      return refetchTracks();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by track or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-card border-border"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px] bg-card border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Track Name</SelectItem>
            <SelectItem value="artist">Artist</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {sortedTracks.length > 0 ? (
          sortedTracks.map((track) => <TrackItem key={track._id} {...track} />)
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No tracks found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
