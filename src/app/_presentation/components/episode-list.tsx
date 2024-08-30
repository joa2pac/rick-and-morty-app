import React from 'react';

interface EpisodeListProps {
  episodes: {
    name: string;
    air_date: string;
  }[];
  title: string;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, title }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <ul>
        {episodes.length > 0 ? (
          episodes.map((episode, index) => (
            <li key={index} className="mb-2 text-white">
              <strong>{episode.name}</strong> - {episode.air_date}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No episodes available.</li>
        )}
      </ul>
    </div>
  );
};

export default EpisodeList;
