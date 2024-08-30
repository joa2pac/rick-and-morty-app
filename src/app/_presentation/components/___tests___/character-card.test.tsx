import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from '../character-card';

describe('CharacterCard Component', () => {
  const characterProps = {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: '/path/to/rick-image.jpg',
  };

  it('should render the character name, status, species, and image', () => {
    render(<CharacterCard {...characterProps} />);

    expect(screen.getByText(characterProps.name)).toBeInTheDocument();
    expect(screen.getByText(characterProps.status)).toBeInTheDocument();
    expect(screen.getByText(characterProps.species)).toBeInTheDocument();

    // Adjust the test to check that the src contains the correct image path
    const image = screen.getByAltText(characterProps.name);
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(characterProps.image)));
  });

  it('should render the image with the correct attributes', () => {
    render(<CharacterCard {...characterProps} />);

    const image = screen.getByAltText(characterProps.name) as HTMLImageElement;
    
    // Adjust the test to match the optimized Next.js image src
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(characterProps.image)));
    expect(image).toHaveAttribute('alt', characterProps.name);
  });
});
