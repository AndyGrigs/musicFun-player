import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Loader } from "lucide-react";

interface Track{
     id: string;
    attributes: {
      title: string;
      attachments: [{ url: string }];
    };
}

interface TrackData{
  data: Track[];
}

function App() {
  const [tracks, setTracks] = useState<TrackData | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [trackDeatils, setTrackDeatils] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDeatils, setLoadingDetails] = useState(true);
  //
  useEffect(() => {
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key":`${import.meta.env.VITE_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setTracks(json))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks${selectedTrackId}`, {
      headers: {
        "api-key":`${import.meta.env.VITE_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrackDeatils(data);
        console.log("track details:", data)
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

  console.log(tracks);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Header />
      <main className=" p-6 flex-grow">
      
         {tracks && tracks?.data.length > 0 ? (
          <ul>
            {tracks?.data.map((track) => (
              <li key={track.id} className={`p-2 cursor-pointer 
                ${selectedTrackId === track.id ? 'bg-cyan-200 border border-blue-200'
               : 'bg-white border border-gray-200 hover:border-blue-300'}`} onClick={()=> setSelectedTrackId(track.id)}>
                <h2 className="mb-2">{track.attributes.title}</h2>
                <audio src={track.attributes.attachments[0].url} controls />
              </li>
            ))}
          </ul>
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
