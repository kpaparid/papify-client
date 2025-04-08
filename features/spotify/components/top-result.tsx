import Image from "next/image";
import { Heart, MoreHorizontal, Play } from "lucide-react";
import { getMockDataForQuery } from "../data";
import { SearchTopResultType } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Helper function to format duration from milliseconds
function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Helper function to format follower count
function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M followers`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K followers`;
  }
  return `${count} followers`;
}

export function TopResult({ topResult }: { topResult: SearchTopResultType }) {
  return (
    <div className="bg-card transition rounded-lg overflow-hidden">
      {topResult.type === "artist" ? (
        <TopResultComponent
          popularity={topResult.popularity}
          title={topResult.name}
          image={topResult.images?.[0] || topResult.album?.images?.[0]}
          type="Artist"
          description={formatFollowers(topResult.followers)}
          description2={topResult.genres.join(", ")}
        />
      ) : topResult.type === "track" ? (
        <TopResultComponent
          popularity={topResult.popularity}
          title={topResult.name}
          image={topResult.images?.[0] || topResult.album?.images?.[0]}
          type="Song"
          links={topResult.artists?.map((artist) => ({
            href: `/artist/${artist.id}`,
            label: artist.name,
          }))}
          hasSave
        />
      ) : // <TrackTopResult result={topResult} />
      topResult.type === "album" ? (
        <AlbumTopResult result={topResult} />
      ) : (
        <PlaylistTopResult result={topResult} />
      )}
    </div>
  );
}

function TopResultComponent({
  type,
  title,
  links,
  description,
  description2,
  popularity,
  image,
  topRight,
  hasSave,
  isSaved,
}: {
  type: string;
  title: string;
  links?: { href: string; label: string }[];
  description?: string;
  description2?: string;
  popularity: number;
  image?: string;
  topRight?: React.ReactNode;
  hasSave?: boolean;
  isSaved?: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-60 aspect-square group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium bg-[#183D3D] px-2 py-1 rounded-full uppercase mb-3 inline-block">
              {type}
            </div>
            <h3 className="text-3xl font-bold mb-1">{title}</h3>
            <div className="text-muted-foreground font-semibold mb-4">
              {links?.map(({ href, label }, index) => (
                <>
                  <Link
                    className="hover:underline hover:text-foreground"
                    key={`link-${index}`}
                    href={href}
                  >
                    {label}
                  </Link>
                  {links.length - 1 !== index && ", "}
                </>
              ))}
              <div className="">
                {description && <div>{description}</div>}
                {description2 && (
                  <div className="capitalize text-sm">{description2}</div>
                )}
              </div>
            </div>
          </div>

          {hasSave && (
            <Button
              variant="ghost"
              className="p-0! rounded-full text-foreground"
            >
              <Heart
                className={cn("w-6! h-6!", isSaved && "fill-foreground")}
              />
            </Button>
            // <div className="flex items-center gap-2 text-sm">{topRight}</div>
          )}
        </div>

        {type === "Song" && (
          <div className="flex items-center gap-3 mt-2">
            <Button className="rounded-full bg-[#183D3D] text-foreground">
              <Play className="h-3 w-3 mr-1 text-foreground fill-foreground" />
              Play
            </Button>
          </div>
        )}

        <div className="mt-4">
          <div className="w-full">
            <div className="flex flex-row justify-between text-sm text-foreground/75 font-semibold mb-1">
              <span>Popularity</span>
              <span>{popularity}%</span>
            </div>
            <div className="h-1.5 bg-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full"
                style={{ width: `${popularity}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbumTopResult({ result }: { result: SearchTopResultType }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-48 aspect-square group">
        <Image
          src={
            result.images?.[0] ||
            result.album?.images?.[0] ||
            "/placeholder.svg"
          }
          alt={result.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="absolute bottom-4 right-4 bg-green-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
          <Play className="h-6 w-6 text-black" fill="black" />
        </button>
      </div>

      <div className="p-5 flex-1">
        <div className="text-xs font-medium bg-neutral-900 px-2 py-1 rounded-full uppercase mb-3 inline-block">
          Album
        </div>
        <h3 className="text-3xl font-bold mb-1">{result.name}</h3>
        <div className="flex items-center text-muted-foreground font-semibold mb-4">
          <div className="flex items-center">
            {result.artists.map((artist, index) => (
              <span key={artist.id}>
                <Link
                  href={`/artist/${artist.id}`}
                  className="hover:text-white hover:underline"
                >
                  {artist.name}
                </Link>
                {index < result.artists.length - 1 && (
                  <span className="mx-1">•</span>
                )}
              </span>
            ))}
          </div>
          <span className="mx-1">•</span>
          <span>{new Date().getFullYear()}</span>
          <span className="mx-1">•</span>
          <span>{10 + (result.id.length % 5)} songs</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Button className="rounded-full bg-green-500 hover:bg-green-400 text-black">
            <Play className="h-4 w-4 mr-1 fill-black" />
            Play
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-neutral-700 hover:border-white"
          >
            Save
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4">
          <div className="w-full">
            <div className="text-xs text-muted-foreground font-semibold mb-1">
              Popularity
            </div>
            <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${result.popularity}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistTopResult({ result }: { result: SearchTopResultType }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-48 aspect-square group shadow-xl">
        <Image
          src={
            result.images?.[0] ||
            result.album?.images?.[0] ||
            "/placeholder.svg"
          }
          alt={result.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="absolute bottom-4 right-4 bg-green-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
          <Play className="h-6 w-6 text-black" fill="black" />
        </button>
      </div>

      <div className="p-5 flex-1">
        <div className="text-xs font-medium bg-neutral-900 px-2 py-1 rounded-full uppercase mb-3 inline-block">
          Playlist
        </div>
        <h3 className="text-3xl font-bold mb-1">{result.name}</h3>
        <div className="flex items-center text-muted-foreground font-semibold mb-4">
          <span>By Spotify</span>
          <span className="mx-1">•</span>
          <span>{formatFollowers(result.followers)} likes</span>
          <span className="mx-1">•</span>
          <span>{50 + (result.id.length % 30)} songs</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Button className="rounded-full bg-green-500 hover:bg-green-400 text-black">
            <Play className="h-4 w-4 mr-1 fill-black" />
            Play
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-neutral-700 hover:border-white"
          >
            Save
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 text-sm text-muted-foreground font-semibold">
          <p className="line-clamp-2">
            The best {result.name.toLowerCase()} tracks all in one playlist.
            Updated regularly with the latest hits.
          </p>
        </div>
      </div>
    </div>
  );
}
