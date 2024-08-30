import { RickAndMortyRepository } from "../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../interfaces/rick-and-morty-interface";

export interface GetSharedEpisodesUseCase {
  invoke: (characterIds: number[]) => Promise<EpisodesResponse>;
}

export class GetSharedEpisodes implements GetSharedEpisodesUseCase {
  private rickAndMortyAPI: RickAndMortyRepository;

  constructor(api: RickAndMortyRepository) {
    this.rickAndMortyAPI = api;
  }

  invoke(characterIds: number[]): Promise<EpisodesResponse> {
    return this.rickAndMortyAPI.getSharedEpisodes(characterIds);
  }
}
