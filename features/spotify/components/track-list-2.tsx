"use client";
import Image from "next/image";
import { Heart, Pause, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import SaveTrackButton from "@/components/save-track-button";
import YouTube from "react-youtube";
import YoutubeQuery from "@/components/youtube-query";
function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
export function List({
  items,
  youtubeHeight = "300",
}: {
  youtubeHeight?: string;
  items: {
    id: string;
    href?: string;
    image?: string;
    name: string;
    links?: { label: string; href: string }[];
    popularity?: number;
    duration?: number;
    hasSave?: boolean;
    isSaved?: boolean;
    rightText?: string;
    description?: string;
    youtubeId?: string;
    youtubeSearchQuery?: string;
  }[];
}) {
  const [youtubePlayerId, setYoutubePlayerId] = useState<string | null>(null);
  console.log("hello", items[0].youtubeSearchQuery);
  return (
    <div className="divide-y-1 divide-accent/50">
      {items.map(({ id, href, youtubeId, youtubeSearchQuery, image, name, links, popularity, duration, hasSave, isSaved, rightText, description }, index) => (
        <div className={cn("p-2 px-4 hover:bg-accent/50 group rounded-sm", youtubePlayerId === id && "bg-accent/50")} key={id}>
          <div className={`grid grid-cols-${[duration || hasSave || popularity, rightText].filter(Boolean).length + 1} gap-4 items-center`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex min-w-7 me-2 items-center justify-center text-muted-foreground font-semibold group-hover:text-white">
                <span
                  className={cn(
                    "font-semibold group-hover:font-normal",
                    (youtubeId || youtubeSearchQuery) && "group-hover:hidden",
                    youtubePlayerId === id && "hidden"
                  )}
                >
                  {index + 1}
                </span>
                <button
                  onClick={() => (youtubeSearchQuery || youtubeId || youtubePlayerId === id) && setYoutubePlayerId(youtubePlayerId === id ? null : id)}
                  className={cn(
                    "hidden text-foreground [&:hover>svg]:fill-foreground cursor-pointer",
                    (youtubeId || youtubeSearchQuery) && "group-hover:block",
                    youtubePlayerId === id && "block"
                  )}
                >
                  {youtubePlayerId === id ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
              </div>
              {image && (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src={image} alt={id} width={40} height={40} className="object-cover" />
                </div>
              )}
              <div className="truncate">
                <div className="truncate font-medium">
                  {href ? (
                    <Link className="hover:underline hover:text-foreground" href={href}>
                      {name}
                    </Link>
                  ) : (
                    name
                  )}
                </div>
                <div className="text-sm text-muted-foreground font-semibold truncate">
                  {description && <span>{description}</span>}
                  {links?.map(({ label, href }, index) => (
                    <Fragment key={`link-${index}`}>
                      <Link className="hover:underline hover:text-foreground" href={href}>
                        {label}
                      </Link>
                      {links.length - 1 !== index && ", "}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            {rightText && (
              <span
                className={cn(
                  "text-nowrap text-sm text-muted-foreground items-center font-semibold ms-auto w-full text-end",
                  hasSave || popularity || (duration && "text-end")
                )}
              >
                {rightText}
              </span>
            )}
            {(duration || hasSave || popularity) && (
              <div className="flex items-center justify-end text-sm text-muted-foreground font-semibold ms-auto gap-10">
                {popularity && (
                  <div className="w-full min-w-32 max-w-xs">
                    <div className="flex flex-row justify-between text-xs text-muted-foreground font-semibold mb-1">
                      <span>Popularity</span>
                      <span>{popularity}%</span>
                    </div>
                    <div className="h-1.5 bg-card rounded-full overflow-hidden">
                      <div className="h-full bg-foreground rounded-full" style={{ width: `${popularity}%` }} />
                    </div>
                  </div>
                )}
                {duration && <span className="mr-4">{formatDuration(duration)}</span>}
                {hasSave && <SaveTrackButton spotifyId={id} isSaved={!!isSaved} />}
              </div>
            )}
          </div>
          {youtubePlayerId === id && (
            <div className="mt-4 rounded-md overflow-hidden">
              {youtubeSearchQuery ? (
                <YoutubeQuery youtubeHeight={youtubeHeight} query={youtubeSearchQuery} onEnd={() => setYoutubePlayerId(null)} />
              ) : (
                <div className="h-[100px]">
                  <YouTube
                    videoId={youtubeId}
                    opts={{
                      width: "100%",
                      height: youtubeHeight,
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                      },
                    }}
                    onEnd={() => setYoutubePlayerId(null)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
// grid-cols-3
