import React from 'react';
import Image from 'next/image';

interface CharacterCardProps {
  name: string;
  status: string;
  species: string;
  image: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, status, species, image }) => {
  const statusColor = status === 'Alive' ? 'text-green-500' : status === 'Dead' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center shadow-lg">
      <div className="mb-2">
        <Image
          src={image}
          alt={name}
          width={64}  
          height={64} 
          className="mx-auto rounded-full mb-2"
          placeholder="blur" 
          blurDataURL={image}
        />
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      <p className={`text-sm font-medium ${statusColor}`}>{status}</p>
      <p className="text-sm text-gray-400">{species}</p>
    </div>
  );
};

export default CharacterCard;
