import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RickAndMortyProvider } from '../context/rick-and-morty-context';
import { useRickAndMorty } from './use-rick-and-morty';

// A test component to use the hook
const TestComponent: React.FC = () => {
  const context = useRickAndMorty();

  return (
    <div>
      <div>Characters Count: {context.characters.length}</div>
      <div>Episodes Count: {context.episodes.length}</div>
      <div>
        Selected Character: {context.selectedCharacter ? context.selectedCharacter.name : 'None'}
      </div>
    </div>
  );
};

describe('useRickAndMorty Hook', () => {
  it('should throw an error when used outside of RickAndMortyProvider', () => {
    // Suppress the expected error from being shown in the console
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useRickAndMorty must be used within a RickAndMortyProvider'
    );

    consoleError.mockRestore();
  });

  it('should provide context values when used within RickAndMortyProvider', () => {
    render(
      <RickAndMortyProvider>
        <TestComponent />
      </RickAndMortyProvider>
    );

    expect(screen.getByText('Characters Count: 0')).toBeInTheDocument();
    expect(screen.getByText('Episodes Count: 0')).toBeInTheDocument();
    expect(screen.getByText('Selected Character: None')).toBeInTheDocument();
  });
});
