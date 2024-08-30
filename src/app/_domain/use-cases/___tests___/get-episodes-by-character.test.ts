import { RickAndMortyRepository } from "../../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../../interfaces/rick-and-morty-interface";
import { GetEpisodesByCharacter } from "../get-episodes-by-character";

describe('GetEpisodesByCharacter Use Case', () => {
  let useCase: GetEpisodesByCharacter;
  let mockRepository: jest.Mocked<RickAndMortyRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getEpisodesByCharacter: jest.fn(),
      getSharedEpisodes: jest.fn(),
      getAllEpisodes: jest.fn(),
    };

    useCase = new GetEpisodesByCharacter(mockRepository);
  });

  it('should call the repository with the correct character ID', async () => {
    const mockResponse: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    mockRepository.getEpisodesByCharacter.mockResolvedValueOnce(mockResponse);

    const result = await useCase.invoke(1);

    expect(mockRepository.getEpisodesByCharacter).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });
});
