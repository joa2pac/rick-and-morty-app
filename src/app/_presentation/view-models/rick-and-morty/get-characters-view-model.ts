import { RickAndMortyAPIImplementation } from '@/app/_data/rick-and-morty-implementation';
import { CharactersResponse } from '@/app/_domain/interfaces/rick-and-morty-interface';
import { GetCharacters } from '@/app/_domain/use-cases/get-characters';
import { useState } from 'react';

interface GetCharactersViewModelResponse {
  getCharacters: (page: number, searchQuery?: string) => Promise<void>;
  charactersData: CharactersResponse;
  error: string | undefined;
  loading: boolean;
}

export default function GetCharactersViewModel(): GetCharactersViewModelResponse {
  const [charactersData, setCharactersData] = useState<CharactersResponse>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  });
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const useCase = new GetCharacters(new RickAndMortyAPIImplementation());

  async function getCharacters(page: number, searchQuery: string = ''): Promise<void> {
    try {
      setLoading(true);
      const response: CharactersResponse = await useCase.invoke(page, searchQuery);
      if (response.results) {
        setCharactersData({
          ...response,
          results: response.results.slice(0, 6), // Limit to 6 characters
        });
        setError(undefined);  // Clear error if request is successful
      } else {
        setError('Error getting characters info.');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError('No characters found for the search query.');
      } else {
        console.error(error);
        setError('Unexpected error getting characters info.');
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    getCharacters,
    charactersData,
    error,
    loading,
  };
}
