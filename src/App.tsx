import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
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

interface TrackDetails {
  data: {
    id: string;
    attributes: {
      title: string;
      artist?: string;
      album?: string;
      duration?: number;
      genre?: string;
      releaseDate?: string;
      attachments: [{ url: string }];
    };
  };
}

function App() {
  const [tracks, setTracks] = useState<TrackData | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  //
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

  useEffect(() => {
    if (!selectedTrackId) return;
    setLoadingDetails(true);
    fetch(
      `https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${selectedTrackId}`,
      {
        headers: {
          "api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTrackDetails(data);
        console.log("track details:", data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingDetails(false));
  }, [selectedTrackId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Header />
      <main className=" p-6 flex-grow">
        {tracks && tracks?.data.length > 0 ? (
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
            </ul>
            {selectedTrackId && trackDetails && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Track Details</h3>
                {loadingDetails ? (
                  <Loader className="animate-spin w-8 h-8 text-blue-500" />
                ) : (
                  <div className="space-y-2">
                    <p>
                      <strong>Title:</strong>{" "}
                      {trackDetails.data.attributes.title}
                    </p>
                    <p>
                      <strong>Artist:</strong>{" "}
                      {trackDetails.data.attributes.artist || "Unknown"}
                    </p>
                    <p>
                      <strong>Album:</strong>{" "}
                      {trackDetails.data.attributes.album || "Unknown"}
                    </p>
                    <p>
                      <strong>Genre:</strong>{" "}
                      {trackDetails.data.attributes.genre || "Unknown"}
                    </p>
                    <p>
                      <strong>ID:</strong> {trackDetails.data.id}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No Track avaliable</p>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
