"use client";
import { Button } from "@/components/ui/button";
import { format, isToday } from "date-fns";
import { Filter, Grid, Pencil, RefreshCw, Search, Trash2, List as List2, ArrowUpDown, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment, ReactElement, ReactNode, useMemo, useState } from "react";
import TrackItem from "../track-list/components/track-item";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import YouTube from "react-youtube";
import ActionButton from "../spotify/components/action-button";
export interface ListItem {
  id: string;
  image?: string;
  title: string;
  description?: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  badgeClassName?: string;
  deleteAction?: (id: string) => void;
  labels?: { text: string; className?: string; onClick?: () => void }[];
  editHref?: string;
  meta?: Record<string, ReactNode>;
  youtubeId?: string;
}
export interface ListProps {
  title: string;
  items: ListItem[];
  date: string;
  refetch: () => Promise<void>;
  defaultView?: "table" | "card";
  multiView?: boolean;
  filters?: {
    field: string;
    label: string;
  }[];
  sort?: {
    field: string;
    label: string;
    type?: "date" | "string" | "number";
  }[];
  renderCardItem?: (
    item: ListItem,
    youtube?: {
      youtubeId?: string;
      showYoutubePlayer: boolean;
      onYoutubePlayerClick: () => void;
      onYoutubePlayerEnd: () => void;
    }
  ) => ReactElement;
  renderTableItem?: (
    item: ListItem,
    youtube?: {
      youtubeId?: string;
      showYoutubePlayer: boolean;
      onYoutubePlayerClick: () => void;
      onYoutubePlayerEnd: () => void;
    }
  ) => ReactElement;
}
export default function List({
  title,
  items,
  date,
  refetch,
  multiView,
  defaultView = "table",
  filters,
  sort,
  renderCardItem = (item: ListItem) => <div>{item.title}</div>,
  renderTableItem = (item: ListItem, youtube) => <TableItem {...item} {...youtube} />,
}: ListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">(defaultView);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState<string[]>([]);
  const [sortState, setSortState] = useState<string | null>(null);
  const [youtubePlayerId, setYoutubePlayerId] = useState<string | null>(null);
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (searchQuery) {
        return item.meta && Object.values(item.meta).some((value) => value?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
      }
      if (filterState.length > 0) {
        return filterState.reduce((acc, filter) => acc || !!item?.meta?.[filter] === true, false);
      }
      return true;
    });
  }, [items, searchQuery, filterState]);

  const sortedItems = useMemo(() => {
    if (!sortState) return filteredItems;
    const [field, order] = sortState.split(":");
    return [...filteredItems].sort((a, b) => {
      const aValue = a.meta?.[field] as string | number | boolean;
      const bValue = b.meta?.[field] as string | number | boolean;
      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue as string) * (order === "asc" ? 1 : -1);
      }
      if (typeof aValue === "number") {
        return (aValue - (bValue as number)) * (order === "asc" ? 1 : -1);
      }
      if (typeof aValue === "boolean") {
        return (Number(aValue) - Number(bValue as boolean)) * (order === "asc" ? 1 : -1);
      }
      return 0;
    });
  }, [filteredItems, sortState]);

  const renderedTableItems = useMemo(
    () =>
      sortedItems.map((track) => (
        <Fragment key={track.id}>
          {renderTableItem(track, {
            youtubeId: track.youtubeId,
            showYoutubePlayer: youtubePlayerId === track.id,
            onYoutubePlayerClick: () => {
              setYoutubePlayerId((prev) => (prev === track.id ? null : track.id));
            },
            onYoutubePlayerEnd: () => setYoutubePlayerId(null),
          })}
        </Fragment>
      )),
    [sortedItems, youtubePlayerId]
  );

  const renderedCardItems = useMemo(
    () =>
      sortedItems.map((track) => (
        <Fragment key={track.id}>
          {renderCardItem(track, {
            youtubeId: track.youtubeId,
            showYoutubePlayer: youtubePlayerId === track.id,
            onYoutubePlayerClick: () => {
              setYoutubePlayerId((prev) => (prev === track.id ? null : track.id));
            },
            onYoutubePlayerEnd: () => setYoutubePlayerId(null),
          })}
        </Fragment>
      )),
    [sortedItems, youtubePlayerId]
  );

  return (
    <>
      {/* Tracks Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground font-semibold">
          Last synced:{" "}
          {`${isToday(new Date(date)) ? "Today" : format(new Date(date), "PPP")} at
            ${format(new Date(), "h:mm a")}`}
        </p>
      </div>
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tracks..."
              className="pl-8 bg-card border-primary text-foreground hover:bg-accent hover:text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {filters && (
            <Dropdown
              icon={<Filter />}
              multi
              value={filterState}
              onChange={(value) =>
                setFilterState((old) => {
                  const newState = filterState.includes(value) ? old.filter((f) => f !== value) : [...old, value];
                  if (newState.length === filters.length) return [];
                  return newState;
                })
              }
              options={filters.map((f) => ({
                value: f.field,
                label: f.label,
              }))}
            />
          )}
          {sort && (
            <Dropdown
              icon={<ArrowUpDown />}
              onChange={setSortState}
              value={sortState}
              options={sort
                .map(({ field, label }) => [
                  { field, label, order: "asc" },
                  { field, label, order: "desc" },
                ])
                .flat()
                .map(({ field, label, order }) => ({
                  value: `${field}:${order}`,
                  label: `${label} (${order === "asc" ? "A-Z" : "Z-A"})`,
                  order,
                }))}
            />
          )}
          <TopButton action={refetch} icon={<RefreshCw />} />
          {multiView && (
            <div className="flex bg-card border border-primary rounded-md overflow-hidden">
              <button
                className={`rounded-0 size-[34px] p-2 flex items-center justify-center cursor-pointer ${
                  viewMode === "card" ? "bg-card text-foreground brightness-150" : "bg-card text-foreground opacity-50 hover:opacity-100"
                }`}
                onClick={() => setViewMode("card")}
                aria-label="Card view"
              >
                <List2 className="h-4 w-4" />
              </button>
              <div className="h-6 my-1 w-px bg-primary" />
              <button
                className={`rounded-0 size-[34px] p-2 flex items-center justify-center cursor-pointer ${
                  viewMode === "table" ? "bg-card text-foreground/50 brightness-150" : "bg-card text-foreground opacity-50 hover:opacity-100"
                }`}
                onClick={() => setViewMode("table")}
                aria-label="Table view"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Tabs value={viewMode} className="w-full">
        <TabsContent value="table">
          <div className="space-y-3 mb-6">{renderedTableItems}</div>
        </TabsContent>

        <TabsContent value="card">
          <div className="space-y-3 mb-6">{renderedCardItems}</div>
        </TabsContent>
      </Tabs>
    </>
  );
}

function TableItem({
  id,
  image,
  title,
  description,
  badgeText,
  badgeIcon,
  badgeClassName,
  deleteAction,
  showYoutubePlayer,
  onYoutubePlayerClick,
  onYoutubePlayerEnd,
  labels,
  youtubeId,
  editHref,
}: {
  id: string;
  image?: string;
  title: string;
  description?: string;
  youtubeId?: string;
  showYoutubePlayer?: boolean;
  onYoutubePlayerClick?: () => void;
  onYoutubePlayerEnd?: () => void;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  badgeClassName?: string;
  deleteAction?: (id: string) => void | Promise<void>;
  labels?: {
    text: string;
    className?: string;
    onClick?: () => void;
    isActive?: boolean;
  }[];
  editHref?: string;
}) {
  const onDeleteAction = deleteAction && deleteAction.bind(null, id);
  return (
    <div className="group relative rounded-xl bg-card border-accent border p-3 transition-all hover:bg-card">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className={cn("relative", "w-full md:w-16 h-16", labels && labels?.length > 0 && "w-full md:w-20 h-20")}>
            <div className="relative h-full w-full cursor-pointer group" onClick={onYoutubePlayerClick}>
              <Image
                src={image || "/placeholder.svg?height=300&width=300" || "/placeholder.svg"}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-md"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                {showYoutubePlayer ? <Pause className="size-8 text-white" /> : <Play className="size-8 text-white" />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <h3 className="font-medium text-xl line-clamp-1">{title}</h3>
              {badgeText && (
                <Badge className={cn("bg-[#183D3D] text-accent-foreground flex items-center gap-1 [&>svg]:size-3", badgeClassName)}>
                  {badgeIcon}
                  {badgeText}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {editHref && (
                <Link
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 size-9 cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-accent"
                  href={editHref}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              )}
              {
                deleteAction && onDeleteAction && (
                  <ActionButton
                    spinner
                    variant="ghost"
                    size="icon"
                    action={onDeleteAction}
                    className="cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 [&:hover>svg]:fill-auto"
                    icon={<Trash2 className="h-4 w-4" />}
                  />
                )
                // <form action={onDeleteAction}>
                //   <Button
                //     type='submit'
                //     variant='ghost'
                //     size='icon'
                //     className='cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10'
                //   >
                //     <Trash2 className='h-4 w-4' />
                //   </Button>
                // </form>
              }
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-0.5 font-semibold">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="mt-2">
            {labels && labels?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                {labels.map(({ text, isActive, onClick, className = "" }, index) => (
                  <Badge asChild key={`label-${index}`}>
                    <Button
                      onClick={onClick}
                      className={cn(
                        "text-accent-foreground h-auto cursor-pointer",
                        isActive ? "bg-[#183D3D] hover:brightness-75" : "bg-accent/75 opacity-50 hover:opacity-100"
                      )}
                    >
                      {text}
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* YouTube Player */}
      {showYoutubePlayer && youtubeId && (
        <div className="mt-4 rounded-md overflow-hidden">
          <YouTube
            videoId={youtubeId}
            opts={{
              width: "100%",
              height: "300",
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
              },
            }}
            onEnd={onYoutubePlayerEnd}
          />
        </div>
      )}
    </div>
  );
}
function TopButton({ action, icon, text }: { action: () => Promise<void>; icon: ReactElement; text?: string }) {
  return (
    <form action={action}>
      <Button type="submit" variant="outline" size="sm" className="bg-card border-primary h-9 cursor-pointer gap-1 [&>svg]:size-4">
        {icon}
        {text}
      </Button>
    </form>
  );
}
function Dropdown({
  icon,
  text,
  options,
  multi,
  value,
  onChange,
}: {
  multi?: boolean;
  icon: ReactElement;
  text?: string;
  value?: string | string[] | null;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-card border-primary h-9 cursor-pointer gap-1 [&>svg]:size-3 text-foreground">
          {icon}
          {text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-primary text-foreground">
        {multi ? (
          <>
            {options.map((option, index) => (
              <DropdownMenuCheckboxItem
                className="pr-4"
                key={`option-${index}`}
                checked={(value as string[]).includes(option.value)}
                onCheckedChange={() => onChange(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        ) : (
          <DropdownMenuRadioGroup value={value as string} onValueChange={onChange}>
            {options.map((option, index) => (
              <DropdownMenuRadioItem className="pr-4" key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
