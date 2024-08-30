import { RickAndMortyRepository } from "../../interfaces/repositories/rick-and-morty-repositories";
import { CharactersResponse } from "../../interfaces/rick-and-morty-interface";
import { GetCharacters } from "../get-characters";

describe('GetCharacters Use Case', () => {
  let useCase: GetCharacters;
  let mockRepository: jest.Mocked<RickAndMortyRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getEpisodesByCharacter: jest.fn(),
      getSharedEpisodes: jest.fn(),
      getAllEpisodes: jest.fn(),
    };

    useCase = new GetCharacters(mockRepository);
  });

  it('should call the repository with correct parameters', async () => {
    const mockResponse: CharactersResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'image-url' }],
    };

    mockRepository.getCharacters.mockResolvedValueOnce(mockResponse);

    const result = await useCase.invoke(1, 'Rick');
    
    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1, 'Rick');
    expect(result).toEqual(mockResponse);
  });
});
