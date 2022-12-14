import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Quotes header', () => {
  render(<App />);
  const header = screen.getByText(/Quotes/i);
  expect(header).toBeInTheDocument();
});

test('renders Favorites', ()=> {
  render(<App/>);
  fireEvent(
    screen.getAllByTestId('emoji-btn')[0],
    new MouseEvent('click'),
  );
  const header = screen.getByText('Favorites');
  const button = screen.getByText('Clear Favorites');
  expect(header).toBeInTheDocument();
  expect(button).toBeInTheDocument();
})