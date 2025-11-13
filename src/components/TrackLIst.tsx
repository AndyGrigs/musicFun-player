import {useEffect, useState} from 'react';
import { Loader } from "lucide-react";


const TrackLIst = () => {
  const [tracks, setTracks] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);
  
    if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );



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

  return (
    <h1>{tracks && tracks?.data.length > 0 ? (
          <div className="flex">
            <ul>
              {tracks?.data.map((track) => (
                <li
                  key={track.id}
                  className={`p-2 cursor-pointer 
                ${
                  selectedTrackId === track.id
                    ? "bg-cyan-200 border border-blue-200"
                    : "bg-white border border-gray-200 hover:border-blue-300"
                }`}
                  onClick={() => setSelectedTrackId(track.id)}
                >
                  <h2 className="mb-2">{track.attributes.title}</h2>
                  <audio src={track.attributes.attachments[0].url} controls />
                </li>
              ))}
            </ul></h1>
  )
}

export default TrackLIst