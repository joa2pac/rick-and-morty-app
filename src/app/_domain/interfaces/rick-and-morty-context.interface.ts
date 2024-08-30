import { Character, Episode } from "./rick-and-morty-interface";

export interface RickAndMortyContextProps {
  characters: Character[];
  episodes: Episode[];
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
  setCharacters: (characters: Character[]) => void;
  setEpisodes: (episodes: Episode[]) => void;
}
