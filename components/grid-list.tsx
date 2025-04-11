import Image from "next/image";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

export default function GridList({
  items,
}: {
  items: {
    id: string;
    href: string;
    image?: string;
    name: string;
    descriptions?: ReactNode[];
    links?: { href: string; label: string }[];
  }[];
}) {
  return (
    <div className="flex w-full flex-wrap gap-6">
      {items.map(({ id, href, image, name, descriptions, links }) => (
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
          <div className="truncate text-center mt-1.5 max-w-[200px] text-muted-foreground text-sm font-semibold">
            <div className="font-medium truncate text-foreground text-base">
              {name}
            </div>
            {links &&
              links.map(({ href, label }, index) => (
                <Fragment key={`link-${index}`}>
                  <Link
                    href={href}
                    className="hover:underline hover:text-foreground"
                  >
                    {label}
                  </Link>
                  {index < links.length - 1 && " • "}
                </Fragment>
              ))}
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
