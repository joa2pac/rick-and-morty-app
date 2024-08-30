import { RICK_AND_MORTY_BASE_API_URL } from '@/app/_core/config/api-constants';
import { CharactersResponse, EpisodesResponse } from '@/app/_domain/interfaces/rick-and-morty-interface';
import { RickAndMortyRepository } from '@/app/_domain/interfaces/repositories/rick-and-morty-repositories';
import { AxiosFetchRepository } from '../_core/repositories/axios-fetch-repository';

export class RickAndMortyAPIImplementation extends AxiosFetchRepository implements RickAndMortyRepository {
  private baseUrl = RICK_AND_MORTY_BASE_API_URL;

  getCharacters(page: number, searchQuery: string = ''): Promise<CharactersResponse> {
    const url = `${this.baseUrl}/character?page=${page}${searchQuery ? `&name=${searchQuery}` : ''}`;
    return super.get<CharactersResponse>(url);
  }

  getEpisodesByCharacter(characterId: number): Promise<EpisodesResponse> {
    const url = `${this.baseUrl}/episode?character=${characterId}`;
    return super.get<EpisodesResponse>(url);
  }

  getSharedEpisodes(characterIds: number[]): Promise<EpisodesResponse> {
    const idsQuery = characterIds.map(id => `character=${id}`).join('&');
    const url = `${this.baseUrl}/episode?${idsQuery}`;
    return super.get<EpisodesResponse>(url);
  }

  getAllEpisodes(): Promise<EpisodesResponse> {
    const url = `${this.baseUrl}/episode`;
    return super.get<EpisodesResponse>(url);
  }
}
