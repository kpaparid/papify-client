"use client";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleSpotifyTrackAction } from "@/features/track-list/actions";
import { useActionState } from "react";
import ActionButton from "@/features/spotify/components/action-button";

export default function SaveTrackButton({
  className,
  isSaved,
  spotifyId,
}: {
  className?: string;
  isSaved: boolean;
  spotifyId: string;
}) {
  const action = toggleSpotifyTrackAction.bind(null, spotifyId, !isSaved);
  if (isSaved) {
    console.log("isSaved", spotifyId);
  }
  return (
    <ActionButton
      className={cn(
        isSaved ? "[&>svg]:fill-foreground" : "[&>svg]:fill-none",
        className
      )}
      pendingClassName={`[&>svg]:fill-foreground/25 [&>svg]:text-foreground/25`}
      action={action}
      icon={<Heart />}
    />
  );
}
