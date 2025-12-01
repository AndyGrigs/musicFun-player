import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import TrackList from "./components/TrackLIst";
import TrackDeatails from "./components/TrackDeatails";

export interface Track {
  id: string;
  attributes: {
    title: string;
    attachments: [{ url: string }];
  };
}

export interface TrackDetails {
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
    const [trackId, setTrackId] = useState<string | null>(null)
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Header />
      <div className='p-10 flex'>
            <TrackList onTrackSelected={(id)=>{
              setTrackId(id)
          }}/>
          <TrackDeatails  trackId={trackId}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
