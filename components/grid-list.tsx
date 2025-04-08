import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function GridList({
  items,
}: {
  items: {
    id: string;
    href: string;
    image?: string;
    name: string;
    descriptions?: ReactNode[];
  }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {items.map(({ id, href, image, name, descriptions }) => (
        <div key={id} className="group">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group max-h-[200px] min-h-[200px]">
            <Link href={href}>
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={200}
                height={200}
                className="object-cover group-hover:opacity-70 transition group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="truncate text-center mt-1.5">
            <div className="font-medium truncate">{name}</div>
            {descriptions && (
              <div className="text-sm text-muted-foreground font-semibold truncate">
                {descriptions.join(" • ")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
