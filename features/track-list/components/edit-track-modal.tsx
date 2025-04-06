"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrackData } from "./track-item";
import { YoutubeSearch } from "./youtube-search";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface EditYoutubeDialogProps {
  track: TrackData;
}

export function EditTrackModal({ track }: EditYoutubeDialogProps) {
  const currentYoutubeVideo = track.youtube?.[0];

  // This will handle closing the dialog after a successful update
  const handleSuccess = () => {
    // onOpenChange(false)
  };
  const router = useRouter();
  const handleClose = () => router.back();
  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {track.spotify.name}</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh]">
          <YoutubeSearch
            currentYoutubeVideo={{
              id: currentYoutubeVideo.youtubeId,
              title: currentYoutubeVideo.title,
              thumbnailUrl: currentYoutubeVideo.images[0],
              description: currentYoutubeVideo.description,
            }}
            trackId={track.id}
            initialQuery={
              track.spotify.name +
              " " +
              track.spotify.artists.map((a) => a.name).join(" ")
            }
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
