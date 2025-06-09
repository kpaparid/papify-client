"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format, isToday } from "date-fns"
import {
  ArrowUpDown,
  Filter,
  Grid,
  List as List2,
  Pause,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, ReactElement, ReactNode, useMemo, useState } from "react"
import YouTube from "react-youtube"
import ActionButton from "../spotify/components/action-button"
export interface ListItem {
  id: string
  image?: string
  href?: string
  title: string
  description?: string
  iconPlaceholder?: React.ReactNode
  tableDescription?: string
  badgeText?: string
  badgeIcon?: React.ReactNode
  badgeClassName?: string
  deleteAction?: (id: string) => void
  deleteDisabled?: boolean
  editDisabled?: boolean
  labels?: { text: string; className?: string; onClick?: () => void }[]
  editHref?: string
  meta?: Record<string, ReactNode>
  youtubeId?: string
}
export interface TabItem {
  value: string
  label: string
  disabled?: boolean
  items: ListItem[]
}
export interface ListProps {
  title: string
  addHref?: string
  searchPlaceHolder?: string
  items?: ListItem[]
  tabs?: TabItem[]
  date: string
  refetch: () => Promise<void>
  deleteAction?: () => Promise<void>
  defaultView?: "table" | "card"
  multiView?: boolean
  filters?: {
    field: string
    label: string
  }[]
  sort?: {
    field: string
    label: string
    type?: "date" | "string" | "number"
  }[]
  renderCardItem?: (
    item: ListItem,
    youtube?: {
      youtubeId?: string
      showYoutubePlayer: boolean
      onYoutubePlayerClick: () => void
      onYoutubePlayerEnd: () => void
    },
    index?: number
  ) => ReactElement
  renderTableItem?: (
    item: ListItem,
    youtube?: {
      youtubeId?: string
      showYoutubePlayer: boolean
      onYoutubePlayerClick: () => void
      onYoutubePlayerEnd: () => void
    },
    index?: number
  ) => ReactElement
}
export default function List({
  title,
  items,
  date,
  refetch,
  multiView,
  defaultView = "card",
  filters,
  searchPlaceHolder = "Search tracks...",
  addHref,
  deleteAction,
  sort,
  tabs,
  renderCardItem = (item: ListItem, youtube, index) => (
    <TableItem index={index} {...item} {...youtube} />
  ),
  renderTableItem = (item: ListItem, youtube) => (
    <CardItem {...item} {...youtube} />
  ),
}: ListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">(defaultView)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterState, setFilterState] = useState<string[]>([])
  const [sortState, setSortState] = useState<string | null>(null)
  const [youtubePlayerId, setYoutubePlayerId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(
    tabs?.[0]?.value || null
  )
  const filteredItems = useMemo(() => {
    const activeItems = (
      tabs ? tabs.find((tab) => tab.value === activeTab)?.items : items
    ) as ListItem[]
    return activeItems.filter((item) => {
      if (searchQuery) {
        return (
          item.meta &&
          Object.values(item.meta).some((value) =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }
      if (filterState.length > 0) {
        return filterState.reduce(
          (acc, filter) => acc || !!item?.meta?.[filter] === true,
          false
        )
      }
      return true
    })
  }, [items, tabs, activeTab, searchQuery, filterState])

  const sortedItems = useMemo(() => {
    if (!sortState) return filteredItems
    const [field, order] = sortState.split(":")
    return [...filteredItems].sort((a, b) => {
      const aValue = a.meta?.[field] as string | number | boolean
      const bValue = b.meta?.[field] as string | number | boolean
      if (typeof aValue === "string") {
        return (
          aValue.localeCompare(bValue as string) * (order === "asc" ? 1 : -1)
        )
      }
      if (typeof aValue === "number") {
        return (aValue - (bValue as number)) * (order === "asc" ? 1 : -1)
      }
      if (typeof aValue === "boolean") {
        return (
          (Number(aValue) - Number(bValue as boolean)) *
          (order === "asc" ? 1 : -1)
        )
      }
      return 0
    })
  }, [filteredItems, sortState])

  const renderedTableItems = useMemo(
    () =>
      sortedItems.map((track, index) => (
        <Fragment key={track.id}>
          {renderTableItem(
            track,
            {
              youtubeId: track.youtubeId,
              showYoutubePlayer: youtubePlayerId === track.id,
              onYoutubePlayerClick: () => {
                setYoutubePlayerId((prev) =>
                  prev === track.id ? null : track.id
                )
              },
              onYoutubePlayerEnd: () => setYoutubePlayerId(null),
            },
            index
          )}
        </Fragment>
      )),
    [sortedItems, youtubePlayerId]
  )

  const renderedCardItems = useMemo(
    () =>
      sortedItems.map((track, index) => (
        <Fragment key={track.id}>
          {renderCardItem(
            track,
            {
              youtubeId: track.youtubeId,
              showYoutubePlayer: youtubePlayerId === track.id,
              onYoutubePlayerClick: () => {
                setYoutubePlayerId((prev) =>
                  prev === track.id ? null : track.id
                )
              },
              onYoutubePlayerEnd: () => setYoutubePlayerId(null),
            },
            index
          )}
        </Fragment>
      )),
    [sortedItems, youtubePlayerId]
  )

  return (
    <>
      {/* Tracks Header */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-foreground'>{title}</h2>
        <p className='text-sm text-muted-foreground font-semibold'>
          Last synced:{" "}
          {`${
            isToday(new Date(date)) ? "Today" : format(new Date(date), "PPP")
          } at
            ${format(new Date(), "h:mm a")}`}
        </p>
      </div>
      {/* Search and Controls */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div className='flex-1 w-full sm:w-auto'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder={searchPlaceHolder}
              className='pl-8 bg-accent/50 border-primary text-foreground hover:bg-accent hover:text-foreground'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end'>
          {filters && (
            <Dropdown
              icon={<Filter />}
              multi
              value={filterState}
              onChange={(value) =>
                setFilterState((old) => {
                  const newState = filterState.includes(value)
                    ? old.filter((f) => f !== value)
                    : [...old, value]
                  if (newState.length === filters.length) return []
                  return newState
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
            <div className='flex bg-card border border-primary rounded-md overflow-hidden'>
              <button
                className={`rounded-0 size-[34px] p-2 flex items-center justify-center cursor-pointer ${
                  viewMode === "card"
                    ? "bg-card text-foreground brightness-150"
                    : "bg-card text-foreground opacity-50 hover:opacity-100"
                }`}
                onClick={() => setViewMode("card")}
                aria-label='Card view'
              >
                <List2 className='h-4 w-4' />
              </button>
              <div className='h-6 my-1 w-px bg-primary' />
              <button
                className={`rounded-0 size-[34px] p-2 flex items-center justify-center cursor-pointer ${
                  viewMode === "table"
                    ? "bg-card text-foreground/50 brightness-150"
                    : "bg-card text-foreground opacity-50 hover:opacity-100"
                }`}
                onClick={() => setViewMode("table")}
                aria-label='Table view'
              >
                <Grid className='h-4 w-4' />
              </button>
            </div>
          )}
          {addHref && <TopLink href={addHref} icon={<Plus />} />}
          {deleteAction && (
            <TopButton
              type='destructive'
              action={deleteAction}
              icon={<Trash2 />}
            />
          )}
        </div>
      </div>
      {tabs && (
        <div className='border-b border-accent/50'>
          <nav className='flex space-x-1'>
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                disabled={tab.disabled}
                onClick={() => {
                  setActiveTab(tab.value)
                }}
                className={`px-4 hover:bg-transparent py-2 text-sm font-medium border-b-2 border-b-transparent bg-transparent rounded-none hover:cursor-pointer ${
                  activeTab === tab.value
                    ? "text-card-foreground border-b-2 border-card-foreground"
                    : "text-muted-foreground hover:text-card-foreground hover:border-card-foreground"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
      <Tabs value={viewMode} className='w-full'>
        <TabsContent value='table'>
          <div className='space-y-3 mb-6'>{renderedTableItems}</div>
        </TabsContent>

        <TabsContent value='card'>
          <div className='divide-y-3 divide-accent/40 mb-6'>
            {renderedCardItems}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
function TableItem({
  id,
  image,
  iconPlaceholder,
  title,
  description,
  tableDescription = description,
  badgeText,
  href,
  badgeIcon,
  badgeClassName,
  deleteDisabled,
  editDisabled,
  deleteAction,
  showYoutubePlayer,
  onYoutubePlayerClick,
  onYoutubePlayerEnd,
  labels,
  youtubeId,
  editHref,
  index,
}: {
  id: string
  index: number
  iconPlaceholder?: React.ReactNode
  href?: string
  image?: string
  title: string
  description?: string
  tableDescription?: string
  youtubeId?: string
  showYoutubePlayer?: boolean
  onYoutubePlayerClick?: () => void
  onYoutubePlayerEnd?: () => void
  badgeText?: string
  badgeIcon?: React.ReactNode
  badgeClassName?: string
  editDisabled?: boolean
  deleteDisabled?: boolean
  deleteAction?: (id: string) => void | Promise<void>
  labels?: {
    text: string
    className?: string
    onClick?: () => void
    isActive?: boolean
  }[]
  editHref?: string
}) {
  const onDeleteAction = deleteAction && deleteAction.bind(null, id)

  return (
    <div
      className={cn(
        "p-2 px-4 hover:bg-accent/50 group ",
        showYoutubePlayer && "bg-accent/50"
      )}
    >
      <div className='flex flex-row justify-between items-center'>
        <div className='flex items-center gap-3 min-w-0 flex-1'>
          <div className='flex min-w-7 me-2 items-center justify-center text-muted-foreground font-semibold group-hover:text-white'>
            <span
              className={cn(
                "font-semibold group-hover:font-normal",
                youtubeId && "group-hover:hidden",
                showYoutubePlayer && "hidden"
              )}
            >
              {index + 1}
            </span>
            <button
              onClick={onYoutubePlayerClick}
              className={cn(
                "hidden text-foreground [&:hover>svg]:fill-foreground cursor-pointer",
                youtubeId && "group-hover:block",
                showYoutubePlayer && "block"
              )}
            >
              {showYoutubePlayer ? (
                <Pause className='size-4' />
              ) : (
                <Play className='size-4' />
              )}
            </button>
          </div>
          {image ? (
            <div className='relative flex-shrink-0'>
              <Image
                src={image}
                alt={id}
                width={37}
                height={37}
                className='object-cover'
              />
            </div>
          ) : (
            iconPlaceholder && (
              <div className='w-[37px] h-[37px] [&>svg]:w-full [&>svg]:h-full border rounded border-accent p-2'>
                {iconPlaceholder}
              </div>
            )
          )}
          <div className='truncate'>
            <div className='truncate font-medium'>
              {href ? (
                <Link
                  className='hover:underline hover:text-foreground'
                  href={href}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </div>
            <div className='text-sm text-muted-foreground font-semibold truncate'>
              {tableDescription && <span>{tableDescription}</span>}
            </div>
          </div>
        </div>
        {labels && labels?.length > 0 && (
          <div>
            <div className='flex flex-wrap gap-2 mt-1 md:mt-0'>
              {labels.map(
                ({ text, isActive, onClick, className = "" }, index) => (
                  <Badge asChild key={`label-${index}`}>
                    <Button
                      onClick={onClick}
                      className={cn(
                        "text-accent-foreground h-auto cursor-pointer",
                        isActive
                          ? "bg-[#183D3D] hover:brightness-75"
                          : "bg-accent/75 opacity-50 hover:opacity-100"
                      )}
                    >
                      {text}
                    </Button>
                  </Badge>
                )
              )}
            </div>
          </div>
        )}
        <div className='flex items-center gap-1 flex-1 justify-end max-w-[35%]'>
          {editHref && (
            <Link
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 size-9 cursor-pointer h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent",
                editDisabled && "pointer-events-none opacity-50"
              )}
              aria-disabled={editDisabled}
              href={editHref}
            >
              <Pencil className='h-4 w-4' />
            </Link>
          )}
          {deleteAction && onDeleteAction && (
            <ActionButton
              spinner
              variant='ghost'
              size='icon'
              disabled={deleteDisabled}
              action={onDeleteAction}
              className='cursor-pointer h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 [&:hover>svg]:fill-auto'
              icon={<Trash2 className='h-4 w-4' />}
            />
          )}
        </div>
      </div>
      {showYoutubePlayer && (
        <div className='mt-4 rounded-md overflow-hidden'>
          <div className='h-[300px]'>
            <YouTube
              videoId={youtubeId}
              opts={{
                width: "100%",
                height: 300,
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                },
              }}
              onEnd={onYoutubePlayerEnd}
            />
          </div>
        </div>
      )}
    </div>
  )
}
function CardItem({
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
  id: string
  image?: string
  title: string
  description?: string
  youtubeId?: string
  showYoutubePlayer?: boolean
  onYoutubePlayerClick?: () => void
  onYoutubePlayerEnd?: () => void
  badgeText?: string
  badgeIcon?: React.ReactNode
  badgeClassName?: string
  deleteAction?: (id: string) => void | Promise<void>
  labels?: {
    text: string
    className?: string
    onClick?: () => void
    isActive?: boolean
  }[]
  editHref?: string
}) {
  const onDeleteAction = deleteAction && deleteAction.bind(null, id)
  return (
    <div className='group relative rounded-xl bg-card border-accent border p-3 transition-all hover:bg-card'>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col items-center md:flex-row'>
          <div
            className={cn(
              "relative",
              "w-full md:w-16 h-16",
              labels && labels?.length > 0 && "w-full md:w-20 h-20"
            )}
          >
            <div
              className='relative h-full w-full cursor-pointer group'
              onClick={onYoutubePlayerClick}
            >
              <Image
                src={
                  image ||
                  "/placeholder.svg?height=300&width=300" ||
                  "/placeholder.svg"
                }
                alt={title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover rounded-md'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md'>
                {showYoutubePlayer ? (
                  <Pause className='size-8 text-white' />
                ) : (
                  <Play className='size-8 text-white' />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2.5'>
              <h3 className='font-medium text-xl line-clamp-1'>{title}</h3>
              {badgeText && (
                <Badge
                  className={cn(
                    "bg-[#183D3D] text-accent-foreground flex items-center gap-1 [&>svg]:size-3",
                    badgeClassName
                  )}
                >
                  {badgeIcon}
                  {badgeText}
                </Badge>
              )}
            </div>
            <div className='flex items-center gap-1'>
              {editHref && (
                <Link
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 size-9 cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-accent"
                  href={editHref}
                >
                  <Pencil className='h-4 w-4' />
                </Link>
              )}
              {deleteAction && onDeleteAction && (
                <ActionButton
                  spinner
                  variant='ghost'
                  size='icon'
                  action={onDeleteAction}
                  className='cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 [&:hover>svg]:fill-auto'
                  icon={<Trash2 className='h-4 w-4' />}
                />
              )}
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-0.5 font-semibold'>
            <p className='text-sm text-muted-foreground'>{description}</p>
          </div>
          <div className='mt-2'>
            {labels && labels?.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-1 md:mt-0'>
                {labels.map(
                  ({ text, isActive, onClick, className = "" }, index) => (
                    <Badge asChild key={`label-${index}`}>
                      <Button
                        onClick={onClick}
                        className={cn(
                          "text-accent-foreground h-auto cursor-pointer",
                          isActive
                            ? "bg-[#183D3D] hover:brightness-75"
                            : "bg-accent/75 opacity-50 hover:opacity-100"
                        )}
                      >
                        {text}
                      </Button>
                    </Badge>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* YouTube Player */}
      {showYoutubePlayer && youtubeId && (
        <div className='mt-4 rounded-md overflow-hidden'>
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
  )
}
function TopButton({
  action,
  icon,
  text,
  type = "default",
}: {
  action: () => Promise<void>
  icon: ReactElement
  text?: string
  type?: "default" | "destructive"
}) {
  return (
    <form action={action}>
      <Button
        type='submit'
        variant='outline'
        size='sm'
        className={cn(
          "bg-card border-primary h-9 cursor-pointer gap-1 [&>svg]:size-4",
          {
            "text-muted-foreground hover:text-red-400 hover:bg-red-400/10 [&:hover>svg]:fill-auto":
              type === "destructive",
          }
        )}
      >
        {icon}
        {text}
      </Button>
    </form>
  )
}
function TopLink({
  href,
  icon,
  text,
}: {
  href: string
  icon: ReactElement
  text?: string
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md px-3 has-[>svg]:px-2.5 bg-card border-primary h-9 cursor-pointer gap-1 [&>svg]:size-4"
    >
      {icon}
      {text}
    </Link>
  )
}
function Dropdown({
  icon,
  text,
  options,
  multi,
  value,
  onChange,
}: {
  multi?: boolean
  icon: ReactElement
  text?: string
  value?: string | string[] | null
  onChange: (value: string) => void
  options: {
    value: string
    label: string
  }[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='bg-card border-primary h-9 cursor-pointer gap-1 [&>svg]:size-3 text-foreground'
        >
          {icon}
          {text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='bg-card border-primary text-foreground'
      >
        {multi ? (
          <>
            {options.map((option, index) => (
              <DropdownMenuCheckboxItem
                className='pr-4'
                key={`option-${index}`}
                checked={(value as string[]).includes(option.value)}
                onCheckedChange={() => onChange(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        ) : (
          <DropdownMenuRadioGroup
            value={value as string}
            onValueChange={onChange}
          >
            {options.map((option, index) => (
              <DropdownMenuRadioItem
                className='pr-4'
                key={`${option.value}-${index}`}
                value={option.value}
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
