import React from 'react';

interface Attachment {
  url: string;
}

interface TrackAttributes {
  title: string;
  attachments: Attachment[];
}

interface Track {
  id: string;
  attributes: TrackAttributes;
}

interface TrackItemProps {
  track: Track;
  isSelected: boolean;
  onTrackSelect: (trackId: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, isSelected, onTrackSelect }) => {
  const handleClick = () => {
    onTrackSelect(track.id);
  };

  return (
    <div
      className={`p-2 border-2 cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onClick={handleClick}
    >
      <h3>{track.attributes.title}</h3>
      {track.attributes.attachments.length > 0 && (
        <audio controls src={track.attributes.attachments[0].url} />
      )}
    </div>
  );
};

export default TrackItem;

