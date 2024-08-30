import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from '../character-list';

describe('CharacterList Component', () => {
  const characters = [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: '/path/to/rick-image.jpg' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: '/path/to/morty-image.jpg' },
  ];

  const mockOnCharacterSelect = jest.fn();

  it('should render a list of characters', () => {
    render(<CharacterList characters={characters} onCharacterSelect={mockOnCharacterSelect} selectedCharacterId={null} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should call onCharacterSelect with the correct id when a character is clicked', () => {
    render(<CharacterList characters={characters} onCharacterSelect={mockOnCharacterSelect} selectedCharacterId={null} />);

    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(mockOnCharacterSelect).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Morty Smith'));
    expect(mockOnCharacterSelect).toHaveBeenCalledWith(2);
  });

  it('should apply the selected border style to the selected character', () => {
    render(<CharacterList characters={characters} onCharacterSelect={mockOnCharacterSelect} selectedCharacterId={1} />);

    const rickCardWrapper = screen.getByText('Rick Sanchez').closest('.p-2');
    const mortyCardWrapper = screen.getByText('Morty Smith').closest('.p-2');

    expect(rickCardWrapper).toHaveClass('border-4 border-green-500');
    expect(mortyCardWrapper).toHaveClass('border-2 border-transparent');
  });

  it('should apply the default border style to non-selected characters', () => {
    render(<CharacterList characters={characters} onCharacterSelect={mockOnCharacterSelect} selectedCharacterId={2} />);

    const rickCardWrapper = screen.getByText('Rick Sanchez').closest('.p-2');
    const mortyCardWrapper = screen.getByText('Morty Smith').closest('.p-2');

    expect(rickCardWrapper).toHaveClass('border-2 border-transparent');
    expect(mortyCardWrapper).toHaveClass('border-4 border-green-500');
  });
});
