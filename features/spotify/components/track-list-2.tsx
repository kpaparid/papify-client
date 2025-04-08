import Image from "next/image"
import { Heart, Play } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function List({
  items,
}: {
  items: {
    id: string
    image?: string
    name: string
    links?: { label: string; href: string }[]
    popularity?: number
    duration?: number
    hasSave?: boolean
    isSaved?: boolean
  }[]
}) {
  return (
    <div className='divide-y-1 divide-accent'>
      {items.map(
        (
          { id, image, name, links, popularity, duration, hasSave, isSaved },
          index
        ) => (
          <div
            key={id}
            className='grid grid-cols-[16px_4fr_3fr] gap-4 p-2 px-4 hover:bg-accent group'
          >
            <div className='flex items-center justify-center text-muted-foreground font-semibold group-hover:text-white'>
              <span className='group-hover:hidden font-semibold'>
                {index + 1}
              </span>
              <Play className='h-4 w-4 hidden group-hover:block' />
            </div>
            <div className='flex items-center gap-3 min-w-0'>
              <div className='relative w-10 h-10 flex-shrink-0'>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={id}
                  width={40}
                  height={40}
                  className='object-cover'
                />
              </div>
              <div className='truncate'>
                <div className='truncate font-medium'>{name}</div>
                <div className='text-sm text-muted-foreground font-semibold truncate'>
                  {links?.map(({ label, href }, index) => (
                    <>
                      <Link
                        className='hover:underline hover:text-foreground'
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
            <div className='flex items-center justify-end text-sm text-muted-foreground font-semibold ms-auto'>
              {popularity && (
                <div className='w-full min-w-32 max-w-xs mb-4'>
                  <div className='flex flex-row justify-between text-xs text-muted-foreground font-semibold mb-1'>
                    <span>Popularity</span>
                    <span>{popularity}%</span>
                  </div>
                  <div className='h-1.5 bg-card rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-foreground rounded-full'
                      style={{ width: `${popularity}%` }}
                    />
                  </div>
                </div>
              )}
              {duration && <span>{duration}</span>}
              {hasSave && (
                <Heart
                  className={cn("h-4 w-4", { "fill-foreground": isSaved })}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}
