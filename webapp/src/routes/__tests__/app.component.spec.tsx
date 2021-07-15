import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app.component';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Guess That Song/i);
  expect(linkElement).toBeInTheDocument();
});
