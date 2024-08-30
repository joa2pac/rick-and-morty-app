import { RickAndMortyRepository } from "../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../interfaces/rick-and-morty-interface";

export interface GetEpisodesByCharacterUseCase {
  invoke: (characterId: number) => Promise<EpisodesResponse>;
}

export class GetEpisodesByCharacter implements GetEpisodesByCharacterUseCase {
  private rickAndMortyAPI: RickAndMortyRepository;

  constructor(api: RickAndMortyRepository) {
    this.rickAndMortyAPI = api;
  }

  invoke(characterId: number): Promise<EpisodesResponse> {
    return this.rickAndMortyAPI.getEpisodesByCharacter(characterId);
  }
}
