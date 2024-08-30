import { RickAndMortyContextProps } from '@/app/_domain/interfaces/rick-and-morty-context.interface';
import { Character, Episode } from '@/app/_domain/interfaces/rick-and-morty-interface';
import React, { createContext, useState, ReactNode } from 'react';

const RickAndMortyContext = createContext<RickAndMortyContextProps | undefined>(undefined);

interface RickAndMortyProviderProps {
  children: ReactNode;
}

export const RickAndMortyProvider: React.FC<RickAndMortyProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const value = {
    characters,
    episodes,
    selectedCharacter,
    setSelectedCharacter,
    setCharacters,
    setEpisodes,
  };

  return <RickAndMortyContext.Provider value={value}>{children}</RickAndMortyContext.Provider>;
};

export default RickAndMortyContext;
