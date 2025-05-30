"use client";
import { saveSpotifyTracksAction } from "@/features/track-list/actions";

export default function SaveAll({ className = "mr-4 mb-2", ids }: { className?: string; ids: string[] }) {
  const action = saveSpotifyTracksAction.bind(null, ids);
  return (
    <form className={className} action={action}>
      <button type="submit" className="text-sm text-muted-foreground font-semibold hover:text-foreground hover:underline cursor-pointer">
        Save All
      </button>
    </form>
  );
}
