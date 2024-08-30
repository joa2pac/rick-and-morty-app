import { CharactersResponse, EpisodesResponse } from "../rick-and-morty-interface";

export interface RickAndMortyRepository {
  getCharacters: (page: number, searchQuery?: string) => Promise<CharactersResponse>;
  getEpisodesByCharacter: (characterId: number) => Promise<EpisodesResponse>;
  getSharedEpisodes: (characterIds: number[]) => Promise<EpisodesResponse>;
  getAllEpisodes: () => Promise<EpisodesResponse>; // Added this method
}
