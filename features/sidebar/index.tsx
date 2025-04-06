"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, HardDrive, Cookie, Youtube, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { FaGoogleDrive, FaSpotify, FaYoutube } from "react-icons/fa";
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-card/80 backdrop-blur-md border-r border-border">
      <div className="flex h-20 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary-foreground">
            <Music className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Papify</h1>
            <p className="text-sm text-muted-foreground">Music Library</p>
          </div>
        </Link>
      </div>

      <div className="px-3 py-6">
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Library
          </h2>
          <nav>
            <NavItem
              href="/"
              icon={<Music className="h-4 w-4" />}
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
          <nav>
            <NavItem
              href="/google-drive"
              icon={<FaGoogleDrive className="h-4 w-4" />}
              active={pathname === "/google-drive"}
            >
              Google Drive
            </NavItem>
            <NavItem
              href="/youtube"
              icon={<FaYoutube className="h-4 w-4" />}
              active={pathname === "/youtube"}
            >
              YouTube
            </NavItem>
            <NavItem
              href="/spotify/search"
              icon={<FaSpotify className="h-4 w-4" />}
              active={pathname === "/spotify"}
            >
              Spotify
            </NavItem>
          </nav>
        </div>

        <div>
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Settings
          </h2>
          <nav>
            <NavItem
              href="/cookie"
              icon={<Cookie className="h-4 w-4" />}
              active={pathname === "/cookie"}
            >
              Cookie Settings
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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
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
