"use client";
import { BsCollectionPlayFill } from "react-icons/bs";
import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, HardDrive, Cookie, Youtube, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { FaGoogleDrive, FaSpotify, FaYoutube } from "react-icons/fa";
import Image from "next/image";
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[230px]">
      <div className="h-screen w-[230px] sticky top-0 bg-card backdrop-blur-md border-r border-accent">
        <div className="flex h-20 items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="pt-4">
              <Image src="/papify.png" alt="Papify" height={45} width={170} />
            </div>
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary-foreground">
              <Music className="h-5 w-5" />
            </div>
            <div>
              

              <h1 className="text-xl font-bold tracking-tight">Papify</h1>
              <p className="text-sm font-bold text-muted-foreground">
                Your Music. Your Universe.
              </p>
            </div> */}
          </Link>
        </div>

        <div className="px-3 py-10">
          <div className="mb-6">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Library
            </h2>
            <nav>
              <NavItem
                href="/"
                icon={<BsCollectionPlayFill className="size-[18px]" />}
                active={pathname === "/"}
              >
                Collection
              </NavItem>
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Integrations
            </h2>
            <nav className="space-y-1">
              <NavItem
                href="/google-drive"
                icon={<FaGoogleDrive className="size-[18px]" />}
                active={pathname === "/google-drive"}
              >
                Google Drive
              </NavItem>
              <NavItem
                href="/youtube"
                icon={<FaYoutube className="size-[18px]" />}
                active={pathname === "/youtube"}
              >
                YouTube
              </NavItem>
              <NavItem
                href="/spotify/search"
                icon={<FaSpotify className="size-[18px]" />}
                active={pathname.startsWith("/spotify")}
              >
                Spotify
              </NavItem>
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-xl bg-card p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Storage</p>
            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: "65%" }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>6.5 GB used</span>
              <span>10 GB total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}

function NavItem({ href, icon, active, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-md font-medium transition-all",
        active
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <span
        className={cn("flex h-6 w-6 items-center justify-center rounded-md")}
      >
        {icon}
      </span>
      {children}
    </Link>
  );
}
