import { RickAndMortyRepository } from "../../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../../interfaces/rick-and-morty-interface";
import { GetSharedEpisodes } from "../get-shared-episodes";

describe('GetSharedEpisodes Use Case', () => {
  let useCase: GetSharedEpisodes;
  let mockRepository: jest.Mocked<RickAndMortyRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getEpisodesByCharacter: jest.fn(),
      getSharedEpisodes: jest.fn(),
      getAllEpisodes: jest.fn(),
    };

    useCase = new GetSharedEpisodes(mockRepository);
  });

  it('should call the repository with correct character IDs', async () => {
    const mockResponse: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    const characterIds = [1, 2];

    mockRepository.getSharedEpisodes.mockResolvedValueOnce(mockResponse);

    const result = await useCase.invoke(characterIds);

    expect(mockRepository.getSharedEpisodes).toHaveBeenCalledWith(characterIds);
    expect(result).toEqual(mockResponse);
  });
});
