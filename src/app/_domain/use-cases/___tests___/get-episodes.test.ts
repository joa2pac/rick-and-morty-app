import { RickAndMortyRepository } from "../../interfaces/repositories/rick-and-morty-repositories";
import { EpisodesResponse } from "../../interfaces/rick-and-morty-interface";
import { GetEpisodes } from "../get-episodes";

describe('GetEpisodes Use Case', () => {
  let useCase: GetEpisodes;
  let mockRepository: jest.Mocked<RickAndMortyRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getEpisodesByCharacter: jest.fn(),
      getSharedEpisodes: jest.fn(),
      getAllEpisodes: jest.fn(),
    };

    useCase = new GetEpisodes(mockRepository);
  });

  it('should call the repository to get all episodes', async () => {
    const mockResponse: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    mockRepository.getAllEpisodes.mockResolvedValueOnce(mockResponse);

    const result = await useCase.invoke();

    expect(mockRepository.getAllEpisodes).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
