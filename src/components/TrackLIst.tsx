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

const TrackList = () => {
  const [tracks, setTracks] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key": `${import.meta.env.VITE_API_KEY}`,
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

  console.log(tracks?.data);

  return (
    <div>
      {tracks?.data?.map((track) => (
        <div key={track.id}>
          <h3>{track.attributes.title}</h3>
          <audio controls src={track.attributes.attachments[0].url} />
        </div>
      ))}
    </div>
  );
};
export default TrackList;
