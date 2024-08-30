import { RickAndMortyContextProps } from '@/app/_domain/interfaces/rick-and-morty-context.interface';
import { useContext } from 'react';
import RickAndMortyContext from '../context/rick-and-morty-context';

export const useRickAndMorty = (): RickAndMortyContextProps => {
  const context = useContext(RickAndMortyContext);
  if (!context) {
    throw new Error('useRickAndMorty must be used within a RickAndMortyProvider');
  }
  return context;
};
