import React from 'react';
import CharacterCard from './character-card';

interface CharacterListProps {
  characters: Array<{ id: number; name: string; status: string; species: string; image: string }>;
  onCharacterSelect: (id: number) => void;
  selectedCharacterId: number | null; // New prop for tracking the selected character
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterSelect, selectedCharacterId }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {characters.map((character) => (
        <div
          key={character.id}
          onClick={() => onCharacterSelect(character.id)}
          className={` rounded-lg ${selectedCharacterId === character.id ? 'border-2 border-green-500' : 'border-2 border-transparent'}`} // Conditional border
        >
          <CharacterCard {...character} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
