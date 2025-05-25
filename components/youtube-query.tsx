import { fetchYoutubeSearch } from "@/features/api";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import YouTube from "react-youtube";

const YoutubeQuery = ({ query, onEnd, youtubeHeight = "300" }: { query: string; onEnd?: () => void; youtubeHeight?: string }) => {
  const [youtubePlayerId, setYoutubePlayerId] = useState<string | null>(null);
  async function handleLoadData() {
    return await fetchYoutubeSearch(query).then((youtubeTrack) => setYoutubePlayerId(youtubeTrack.youtubeId));
  }
  function handleEnd() {
    onEnd?.();
    setYoutubePlayerId(null);
  }
  useEffect(() => {
    handleLoadData();
  }, []);
  if (!youtubePlayerId)
    return (
      <div className="flex items-center justify-center h-24">
        <FaSpinner className="animate-spin" />
      </div>
    );

  return (
    <YouTube
      videoId={youtubePlayerId}
      opts={{
        width: "100%",
        height: youtubeHeight,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
        },
      }}
      onEnd={handleEnd}
    />
  );
};
export default YoutubeQuery;
