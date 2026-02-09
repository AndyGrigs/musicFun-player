import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import TrackItem from "./TrackItem";

interface Track {
  id: string;
  attributes: {
    title: string;
    attachments: { url: string }[];
  };
}

interface TrackData {
  data: Track[];
}

interface TrackListProps {
  onTrackSelected?: (id: string | null) => void;
}

const TrackList = (props: TrackListProps) => {
  const [tracks, setTracks] = useState<TrackData | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        // "api-key": `${import.meta.env.VITE_API_KEY}`,
          "api-key": "08d8232e-4e08-47d0-b118-75c5950a5713",

      },
    })
      .then((res) => res.json())
      .then((json) => setTracks(json))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );

  if (tracks?.data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>There is no tracks(...</h1>
      </div>
    );
  }

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrackId(trackId);
    props.onTrackSelected?.(trackId);
  };

  return (
    <div>
      <button onClick={() => {
        setSelectedTrackId(null);
        props.onTrackSelected?.(null);
      }}>Reset</button>
      {tracks?.data?.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          isSelected={selectedTrackId === track.id}
          onTrackSelect={handleTrackSelect}
        />
      ))}
    </div>
  );
};
export default TrackList;
