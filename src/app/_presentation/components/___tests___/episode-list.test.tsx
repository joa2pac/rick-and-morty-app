import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EpisodeList from '../episode-list';

describe('EpisodeList Component', () => {
  it('should render the title correctly', () => {
    const title = 'Test Episodes';
    render(<EpisodeList episodes={[]} title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should display a message when no episodes are available', () => {
    render(<EpisodeList episodes={[]} title="Test Episodes" />);

    const noEpisodesMessage = screen.getByText('No episodes available.');
    expect(noEpisodesMessage).toBeInTheDocument();
  });

  it('should render a list of episodes correctly', () => {
    const episodes = [
      { name: 'Pilot', air_date: 'December 2, 2013' },
      { name: 'Lawnmower Dog', air_date: 'December 9, 2013' },
    ];

    render(<EpisodeList episodes={episodes} title="Test Episodes" />);

    // Match by combining the name and air_date using a function
    const firstEpisode = screen.getByText((content, element) => {
      return (
        element?.textContent === 'Pilot - December 2, 2013'
      );
    });
    const secondEpisode = screen.getByText((content, element) => {
      return (
        element?.textContent === 'Lawnmower Dog - December 9, 2013'
      );
    });

    expect(firstEpisode).toBeInTheDocument();
    expect(secondEpisode).toBeInTheDocument();
  });

  it('should render the correct number of episodes', () => {
    const episodes = [
      { name: 'Pilot', air_date: 'December 2, 2013' },
      { name: 'Lawnmower Dog', air_date: 'December 9, 2013' },
    ];

    render(<EpisodeList episodes={episodes} title="Test Episodes" />);

    const episodeItems = screen.getAllByRole('listitem');
    expect(episodeItems).toHaveLength(2);
  });
});
