import Image from "next/image";
import { Heart, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
export function List({
  items,
}: {
  items: {
    id: string;
    image?: string;
    name: string;
    links?: { label: string; href: string }[];
    popularity?: number;
    duration?: number;
    hasSave?: boolean;
    isSaved?: boolean;
    rightText?: string;
    description?: string;
  }[];
}) {
  return (
    <div className="divide-y-1 divide-accent/50">
      {items.map(
        (
          {
            id,
            image,
            name,
            links,
            popularity,
            duration,
            hasSave,
            isSaved,
            rightText,
            description,
          },
          index
        ) => (
          <div
            key={id}
            className={`grid grid-cols-${
              [duration || hasSave || popularity, rightText].filter(Boolean)
                .length + 1
            } gap-4 p-2 px-4 hover:bg-accent/50 group rounded-sm items-center`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex min-w-7 items-center justify-center text-muted-foreground font-semibold group-hover:text-white">
                <span className="group-hover:hidden font-semibold">
                  {index + 1}
                </span>
                <button className="hidden group-hover:block text-foreground [&:hover>svg]:fill-foreground cursor-pointer">
                  <Play className="h-4 w-4" />
                </button>
              </div>
              {image && (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={image}
                    alt={id}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="truncate">
                <div className="truncate font-medium">{name}</div>
                <div className="text-sm text-muted-foreground font-semibold truncate">
                  {description && <span>{description}</span>}
                  {links?.map(({ label, href }, index) => (
                    <>
                      <Link
                        className="hover:underline hover:text-foreground"
                        key={label}
                        href={href}
                      >
                        {label}
                      </Link>
                      {links.length - 1 !== index && ", "}
                    </>
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
              <div className="flex items-center justify-end text-sm text-muted-foreground font-semibold ms-auto">
                {popularity && (
                  <div className="w-full min-w-32 max-w-xs">
                    <div className="flex flex-row justify-between text-xs text-muted-foreground font-semibold mb-1">
                      <span>Popularity</span>
                      <span>{popularity}%</span>
                    </div>
                    <div className="h-1.5 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground rounded-full"
                        style={{ width: `${popularity}%` }}
                      />
                    </div>
                  </div>
                )}
                {duration && (
                  <span className="mr-4">{formatDuration(duration)}</span>
                )}
                {hasSave && (
                  <button className="htext-foreground [&:hover>svg]:fill-foreground cursor-pointer">
                    <Heart
                      className={cn("h-4 w-4", isSaved && "fill-foreground")}
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
