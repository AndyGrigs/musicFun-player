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
      lyrics?: string;
      likesCount?: number; 
    };
  };
}

function App() {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  

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


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Header />
      <main className=" p-6 flex-grow">
        
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
                      <strong>Lyrics:</strong>{" "}
                      {trackDetails.data.attributes.lyrics || "No lyrics are there..."}
                    </p>
                    <p>
                      <strong>Likes:</strong>{" "}
                      {trackDetails.data.attributes.likesCount || "No likes yet(("}
                    </p>
                
                  </div>
                )}
              </div>
            )}
          </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
