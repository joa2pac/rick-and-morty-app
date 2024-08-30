import axios from 'axios';
import { RICK_AND_MORTY_BASE_API_URL } from '@/app/_core/config/api-constants';
import { CharactersResponse, EpisodesResponse } from '@/app/_domain/interfaces/rick-and-morty-interface';
import { RickAndMortyAPIImplementation } from './rick-and-morty-implementation';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

mockedAxios.create.mockReturnValue(mockedAxiosInstance as any);

describe('RickAndMortyAPIImplementation', () => {
  let api: RickAndMortyAPIImplementation;

  beforeEach(() => {
    api = new RickAndMortyAPIImplementation();
  });

  it('should get characters with correct URL', async () => {
    const mockData: CharactersResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'image-url' }],
    };

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await api.getCharacters(1, 'Rick');
    expect(result).toEqual(mockData);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `${RICK_AND_MORTY_BASE_API_URL}/character?page=1&name=Rick`,
      undefined
    );
  });

  it('should get episodes by character with correct URL', async () => {
    const mockData: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await api.getEpisodesByCharacter(1);
    expect(result).toEqual(mockData);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `${RICK_AND_MORTY_BASE_API_URL}/episode?character=1`,
      undefined
    );
  });

  it('should get shared episodes for multiple characters with correct URL', async () => {
    const mockData: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await api.getSharedEpisodes([1, 2]);
    expect(result).toEqual(mockData);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `${RICK_AND_MORTY_BASE_API_URL}/episode?character=1&character=2`,
      undefined
    );
  });

  it('should get all episodes with correct URL', async () => {
    const mockData: EpisodesResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', characters: ['character-url'] }],
    };

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await api.getAllEpisodes();
    expect(result).toEqual(mockData);
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
      `${RICK_AND_MORTY_BASE_API_URL}/episode`,
      undefined
    );
  });
});
