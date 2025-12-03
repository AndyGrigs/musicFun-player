import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface Track {
  id: string;
  attributes: {
    title: string;
    attachments: [{ url: string }];
  };
}

interface TrackData {
  data: Track[];
}

interface TrackListProps {
  onTrackSelected?: (id: string) => void;
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

  

  return (
    <div>
      <button onClick={()=> {
        setSelectedTrackId(null)
        
      }}>Reset</button>
      {tracks?.data?.map((track) => (
        <div key={track.id}
          className={`p-2 border-2 cursor-pointer ${selectedTrackId === track.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onClick={()=>{
            setSelectedTrackId(track.id)
            props.onTrackSelected?.(track.id)
        }}>
          <h3>{track.attributes.title}</h3>
          <audio controls src={track.attributes.attachments[0].url} />
        </div>
      ))}
    </div>
  );
};
export default TrackList;
