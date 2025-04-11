import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleSpotifyTrackAction } from "@/features/track-list/actions";

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
  return (
    <form action={action}>
      <button
        type="submit"
        className="htext-foreground [&:hover>svg]:fill-foreground cursor-pointer"
      >
        <Heart
          className={cn("h-4 w-4", className, isSaved && "fill-foreground")}
        />
      </button>
    </form>
  );
}
