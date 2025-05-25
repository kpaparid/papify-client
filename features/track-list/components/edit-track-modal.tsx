"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YouTube from "react-youtube";
import { format } from "date-fns";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Circle, CircleCheck, Clock, Pause, PlayIcon, Search } from "lucide-react";
import ActionButton from "@/features/spotify/components/action-button";
import { editYoutubeQueryAction } from "../actions";

export interface YoutubeTrack {
  _id: string;
  query: string;
  spotifyId: string;
  youtubeId: string;
  title: string;
  publish_date: string;
  images: string[];
  description: string;
  __v: number;
  collectionIds?: string[];
  isSaved: boolean;
}

interface EditYoutubeDialogProps {
  searchId: string;
  youtubeId: string;
  tracks: YoutubeTrack[];
  query: string;
  query2: string;
}

export function EditTrackModal({ searchId, youtubeId, query, query2, tracks }: EditYoutubeDialogProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query2 || query || "");
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(youtubeId ? youtubeId : null);
  console.log(selectedVideoId);
  console.log(tracks);

  const handleClose = () => router.back();

  const handleSearch = () => {
    router.replace(
      searchQuery
        ? `/youtube-search/${searchId}/edit?youtubeId=${youtubeId}&q=${query}&q2=${searchQuery}`
        : `/youtube-search/${searchId}/edit?youtubeId=${youtubeId}&q=${query}`
    );
  };

  const togglePreview = (videoId: string) => {
    if (previewVideoId === videoId) {
      setPreviewVideoId(null);
    } else {
      setPreviewVideoId(videoId);
    }
  };
  const track = tracks.find((track) => track.youtubeId === selectedVideoId);
  const action = editYoutubeQueryAction.bind(null, searchId, {
    youtubeId: track?.youtubeId,
    title: track?.title,
    publish_date: track?.publish_date,
    images: track?.images,
    description: track?.description,
  });

  const handleSave = async () => {
    return action().then(() => handleClose());
  };

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="min-w-[750px] max-h-[90vh] p-6">
        <div>
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl flex items-center gap-2">Edit Track {query}</DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube videos..."
              className="flex-1 bg-card hover:brightness-110 border border-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              variant="default"
              size="icon"
              onClick={handleSearch}
              className="size-9 bg-card! hover:brightness-110 border border-primary text-foreground! cursor-pointer"
            >
              <Search className="size-4" />
            </Button>
          </div>

          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              {tracks.length > 0 ? (
                tracks.map((track, index) => (
                  <div key={`track-${index}`} className="space-y-3">
                    <Card className={`relative rounded-md border border-primary hover:brightness-110 cursor-pointer p-0 transition-colors `}>
                      <div className="flex gap-3">
                        {/* Thumbnail with play overlay */}
                        <div className="relative cursor-pointer flex-shrink-0 p-3" onClick={() => togglePreview(track.youtubeId)}>
                          <div className="relative w-[120px] h-[68px] rounded overflow-hidden">
                            <Image src={track.images[0] || "/placeholder.svg"} alt={track.title} className="object-cover" fill sizes="120px" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                              {previewVideoId === track.youtubeId ? <Pause className="h-8 w-8 text-white" /> : <PlayIcon className="h-8 w-8 text-white" />}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <button
                          onClick={() => setSelectedVideoId(track.youtubeId)}
                          className="p-3 text-start cursor-pointer flex-1 justify-start items-start h-auto gap-0 min-w-0 flex flex-col flex-shrink"
                        >
                          <div className="flex justify-between items-start gap-2 pe-3">
                            <div>
                              <h3 className="font-medium line-clamp-1 text-sm pe-20">{track.title}</h3>

                              <div className="flex items-center gap-2 mt-1">
                                {track.publish_date && (
                                  <div className="flex items-center text-xs text-muted-foreground font-bold">
                                    {/* <Clock className="h-3 w-3 mr-1" /> */}
                                    {format(new Date(track.publish_date), "dd MMM yyyy")}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="absolute top-3 right-3">
                              {selectedVideoId === track.youtubeId && (
                                <Badge className="bg-foreground text-primary size-auto px-2 text-xs font-semibold! gap-1.5">
                                  Selected <CircleCheck className="size-4!" />
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Description preview */}
                          {track.description && (
                            <div className="mt-1.5 max-w-full text-xs text-muted-foreground">
                              <p className="line-clamp-1">{track.description}</p>
                            </div>
                          )}
                        </button>
                      </div>
                    </Card>

                    {/* YouTube player */}
                    {previewVideoId === track.youtubeId && (
                      <div className="rounded-md overflow-hidden border">
                        <YouTube
                          videoId={track.youtubeId}
                          opts={{
                            width: "100%",
                            height: "250",
                            playerVars: {
                              autoplay: 1,
                              modestbranding: 1,
                            },
                          }}
                          onEnd={() => setPreviewVideoId(null)}
                          className="aspect-video"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-6 flex justify-between gap-2">
            <Button variant="outline" className="cursor-pointer bg-card border-primary" onClick={handleClose}>
              Cancel
            </Button>
            <ActionButton
              variant={"outline"}
              className="cursor-pointer bg-foreground! text-primary! hover:brightness-80 border-primary"
              action={handleSave}
              disabled={!selectedVideoId}
            >
              Save Changes
            </ActionButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
