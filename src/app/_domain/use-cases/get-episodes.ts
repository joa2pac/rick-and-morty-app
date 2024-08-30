import { RickAndMortyRepository } from "../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../interfaces/rick-and-morty-interface";

export interface GetEpisodesUseCase {
  invoke: () => Promise<EpisodesResponse>;
}

export class GetEpisodes implements GetEpisodesUseCase {
  private rickAndMortyAPI: RickAndMortyRepository;

  constructor(api: RickAndMortyRepository) {
    this.rickAndMortyAPI = api;
  }

  invoke(): Promise<EpisodesResponse> {
    return this.rickAndMortyAPI.getAllEpisodes();
  }
}
