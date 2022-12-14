import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const quoteExample = {
  id: 42024,
  quote: "This is a small example of a quotes",
  author: "John Doe"
}

const mockSetFavorite = jest.fn()

test('render Card', () => {
  render(<Card
    id={quoteExample.id}
    quote={quoteExample.quote}
    author={quoteExample.author}
    isFavorite
    setFavorite={mockSetFavorite}
  />)
  const title = screen.getByText(quoteExample.quote)
  const id = screen.getByText(quoteExample.id)
  const author = screen.getByText(quoteExample.author)
  expect(title).toBeInTheDocument();
  expect(id).toBeInTheDocument();
  expect(author).toBeInTheDocument();
})