import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react';

interface TrackAttributes {
  title: string;
  artist?: string;
  album?: string;
  duration?: number;
  genre?: string;
  releaseDate?: string;
  likesCount?: number;
  lyrics?: string;
}

interface TrackData {
  data: {
    attributes: TrackAttributes;
  };
}

interface TrackDeatailsProps {
  trackId: string;
}

const TrackDeatails = (props: TrackDeatailsProps) => {
  const [trackDetails, setTrackDetails] = useState<TrackData | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const selectedTrackId = props.trackId;

  useEffect(() => {
    if (!selectedTrackId) return;
    setLoadingDetails(true);
    fetch(
      `https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${selectedTrackId}`,
      {
        headers: {
          // "api-key": `${import.meta.env.VITE_API_KEY}`,
          "api-key": "08d8232e-4e08-47d0-b118-75c5950a5713",
        },
      }
    )
      .then((res) => res.json())
      .then((data: TrackData) => {
        setTrackDetails(data);
        console.log("track details:", data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingDetails(false));
  }, [selectedTrackId]);

  return (
    <div className="p-4 border-t mt-4">
      {loadingDetails ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : trackDetails ? (
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {trackDetails.data.attributes.title}
          </h2>
          {trackDetails.data.attributes.artist && (
            <p>Artist: {trackDetails.data.attributes.artist}</p>
          )}
          {trackDetails.data.attributes.album && (
            <p>Album: {trackDetails.data.attributes.album}</p>
          )}
          {trackDetails.data.attributes.duration && (
            <p>Duration: {trackDetails.data.attributes.duration} seconds</p>
          )}
          {trackDetails.data.attributes.genre && (
            <p>Genre: {trackDetails.data.attributes.genre}</p>
          )}
          {trackDetails.data.attributes.releaseDate && (
            <p>Release Date: {trackDetails.data.attributes.releaseDate}</p>
          )}
          {trackDetails.data.attributes.likesCount !== undefined && (
            <p>Likes: {trackDetails.data.attributes.likesCount}</p>
          )}
          {trackDetails.data.attributes.lyrics && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Lyrics:</h3>
              <p>{trackDetails.data.attributes.lyrics}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Select a track to see details.</p>
      )}
    </div>
  );
};

export default TrackDeatails