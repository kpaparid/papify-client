"use client";
import { cn } from "@/lib/utils";
import { cloneElement, ReactElement, useActionState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ActionButton({
  className,
  pendingClassName,
  icon,
  action,
  spinner,
}: {
  className?: string;
  icon: ReactElement<any>;
  pendingClassName?: string;
  action: () => Promise<void>;
  spinner?: boolean;
}) {
  //   const action = toggleSpotifyTrackAction.bind(null, spotifyId, !isSaved);
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <button
        type="submit"
        className={cn(
          className,
          "[&:hover>svg]:fill-foreground cursor-pointer [&>svg]:size-4",
          pending && cn("animate-pulse", pendingClassName)
        )}
      >
        {pending && spinner ? <FaSpinner className="animate-spin" /> : icon}
      </button>
    </form>
  );
}
