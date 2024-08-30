/* eslint-disable react-hooks/exhaustive-deps */
import { render, act, waitFor } from '@testing-library/react';
import React from 'react';
import { GetCharacters } from '@/app/_domain/use-cases/get-characters';
import { RickAndMortyAPIImplementation } from '@/app/_data/rick-and-morty-implementation';
import GetCharactersViewModel from '../get-characters-view-model';

// Mock the GetCharacters use case
jest.mock('@/app/_domain/use-cases/get-characters');
jest.mock('@/app/_data/rick-and-morty-implementation');

const TestComponent: React.FC = () => {
  const viewModel = GetCharactersViewModel();
  
  // Trigger data fetching in the useEffect
  React.useEffect(() => {
    viewModel.getCharacters(1);
  }, []);
  
  return (
    <div>
      <div>Loading: {viewModel.loading.toString()}</div>
      <div>Characters: {viewModel.charactersData.results.length}</div>
      <div>Error: {viewModel.error || 'None'}</div>
    </div>
  );
};

describe('GetCharactersViewModel', () => {
  const mockCharactersResponse = {
    info: {
      count: 10,
      pages: 2,
      next: 'next-page-url',
      prev: null,
    },
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'url' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'url' },
    ],
  };

  beforeEach(() => {
    (GetCharacters as jest.Mock).mockClear();
    (RickAndMortyAPIImplementation as jest.Mock).mockClear();
  });

  it('should fetch and set characters data successfully', async () => {
    (GetCharacters.prototype.invoke as jest.Mock).mockResolvedValue(mockCharactersResponse);

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Characters: 2')).toBeInTheDocument();
      expect(getByText('Error: None')).toBeInTheDocument();
      expect(getByText('Loading: false')).toBeInTheDocument();
    });
  });

  it('should set an error message when the API call fails', async () => {
    (GetCharacters.prototype.invoke as jest.Mock).mockRejectedValueOnce({
      response: { status: 404 },
    });

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Characters: 0')).toBeInTheDocument();
      expect(getByText('Error: No characters found for the search query.')).toBeInTheDocument();
      expect(getByText('Loading: false')).toBeInTheDocument();
    });
  });

  it('should set a generic error message for other failures', async () => {
    (GetCharacters.prototype.invoke as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Characters: 0')).toBeInTheDocument();
      expect(getByText('Error: Unexpected error getting characters info.')).toBeInTheDocument();
      expect(getByText('Loading: false')).toBeInTheDocument();
    });
  });

  it('should set loading to true while fetching data', async () => {
    (GetCharacters.prototype.invoke as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Loading: true')).toBeInTheDocument();
    });
  });
});
