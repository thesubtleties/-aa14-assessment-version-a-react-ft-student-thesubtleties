import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import CatsIndex from '../components/CatsIndex';
import cats from '../mockData/cats.json';

describe('(7 points) CatsIndex', () => {
  it ('(1 point) should render an h2 with the text "Cats Index"', () => {
    render(
      <MemoryRouter>
        <CatsIndex cats={cats} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Cats Index', level: 2 })).toBeInTheDocument();
  });

  it ('(5 points) should render a list of cats (with show-page links) from the mockData', () => {
    render(
      <MemoryRouter>
        <CatsIndex cats={cats} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link')).toHaveLength(cats.length);

    let catLink;
    cats.forEach(cat => {
      expect(catLink = screen.getByRole('link', { name: cat.name })).toBeInTheDocument();
      expect(catLink).toHaveAttribute('href', `/cats/${cat.id}`);
    });
  });

  it ('(1 point) should be invoked by the App component at the root route ("/")', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Cats Index', level: 2 })).toBeInTheDocument();
  });
});

