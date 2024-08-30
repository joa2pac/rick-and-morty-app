import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../header';

describe('Header Component', () => {
  it('should render the header with correct text', () => {
    render(<Header />);

    const headerElement = screen.getByText('Rick and Morty Character Selector');
    expect(headerElement).toBeInTheDocument();
  });

  it('should have the correct class names applied', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('bg-gray-900 text-white p-4 shadow-lg');
  });

  it('should render the header as a h1 element', () => {
    render(<Header />);

    const headerTitle = screen.getByText('Rick and Morty Character Selector');
    expect(headerTitle.tagName).toBe('H1');
    expect(headerTitle).toHaveClass('text-2xl font-bold text-center');
  });
});
