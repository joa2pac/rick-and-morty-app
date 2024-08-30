import { RickAndMortyRepository } from "../interfaces/repositories/rick-and-morty-repositories";
import { CharactersResponse } from "../interfaces/rick-and-morty-interface";

export interface GetCharactersUseCase {
  invoke: (page: number, searchQuery?: string) => Promise<CharactersResponse>;
}

export class GetCharacters implements GetCharactersUseCase {
  private rickAndMortyAPI: RickAndMortyRepository;

  constructor(api: RickAndMortyRepository) {
    this.rickAndMortyAPI = api;
  }

  invoke(page: number, searchQuery: string = ''): Promise<CharactersResponse> {
    return this.rickAndMortyAPI.getCharacters(page, searchQuery);
  }
}
