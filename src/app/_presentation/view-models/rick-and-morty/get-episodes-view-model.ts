/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { RickAndMortyAPIImplementation } from '@/app/_data/rick-and-morty-implementation';
import { EpisodesResponse, Episode } from '@/app/_domain/interfaces/rick-and-morty-interface';
import { GetEpisodes } from '@/app/_domain/use-cases/get-episodes';

interface GetEpisodesViewModelResponse {
  getEpisodesByCharacter: (characterId: number) => Episode[];
  getSharedEpisodes: (characterIds: number[]) => Episode[];
  episodesData: EpisodesResponse;
  error: string | undefined;
  loading: boolean;
}

export default function GetEpisodesViewModel(): GetEpisodesViewModelResponse {
  const [episodesData, setEpisodesData] = useState<EpisodesResponse>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  });
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const useCase = new GetEpisodes(new RickAndMortyAPIImplementation());

  async function fetchEpisodes() {
    try {
      setLoading(true);
      const response: EpisodesResponse = await useCase.invoke();
      setEpisodesData(response);
      setError(undefined);  // Clear error if request is successful
    } catch (error: any) {
      console.error(error);
      setError('Unexpected error getting episodes info.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEpisodes();
  }, []);

  function getEpisodesByCharacter(characterId: number): Episode[] {
    if (!episodesData.results) return []; // Safeguard in case episodesData is empty
    return episodesData.results.filter((episode) =>
      episode.characters.includes(`https://rickandmortyapi.com/api/character/${characterId}`)
    );
  }

  function getSharedEpisodes(characterIds: number[]): Episode[] {
    if (!episodesData.results) return []; // Safeguard in case episodesData is empty
    return episodesData.results.filter((episode) =>
      characterIds.every(id => episode.characters.includes(`https://rickandmortyapi.com/api/character/${id}`))
    );
  }

  return {
    getEpisodesByCharacter,
    getSharedEpisodes,
    episodesData,
    error,
    loading,
  };
}
