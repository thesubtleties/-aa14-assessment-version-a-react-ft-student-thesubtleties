/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Navigation from '../components/Navigation';

vi.mock('../components/CatsIndex', () => {
  return {
    default: vi.fn(() => <>Cats Index</>)
  }
});
vi.mock('../components/CatForm', () => {
  return {
    default: vi.fn(() => <>Cat Form</>)
  }
});
vi.mock('../components/PhotoShow', () => {
  return {
    default: vi.fn(() => <>Photo Show</>)
  }
});
vi.mock('../components/TogglePhotoType', () => {
  return {
    default: vi.fn(() => <>Toggle Photo Type</>)
  }
});

describe('(6 points) Navigation', () => {
  it ('(1 point) should render four navigation links: "Home", "Create a Cat", "Photo", and "Set Photo Type"', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link').length).toEqual(4);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create a Cat' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Photo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Set Photo Type' })).toBeInTheDocument();
  });

  it ('(1 point) should render a "Home" navigation link to "/"', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    let link;
    expect(link = screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it ('(1 point) should render a "Create a Cat" navigation link to "/cats/new"', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    let link;
    expect(link = screen.getByRole('link', { name: 'Create a Cat' })).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cats/new');
  });

  it ('(1 point) should render a "Photo" navigation link to "/photo"', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    let link;
    expect(link = screen.getByRole('link', { name: 'Photo' })).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/photo');
  });

  it ('(1 point) should render a "Set Photo Type" navigation link to "/toggle-photo-type"', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    let link;
    expect(link = screen.getByRole('link', { name: 'Set Photo Type' })).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/toggle-photo-type');
  });

  it ('(1 point) should be invoked by the App component', async () => {
    render(<App />);

    let homeLink, catLink, photoLink, toggleLink;
    expect(homeLink = screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(catLink = screen.getByRole('link', { name: 'Create a Cat' })).toBeInTheDocument();
    expect(photoLink = screen.getByRole('link', { name: 'Photo' })).toBeInTheDocument();
    expect(toggleLink = screen.getByRole('link', { name: 'Set Photo Type' })).toBeInTheDocument();

    // Check that each link is set to active when on its respective page
    expect(document.getElementsByClassName('active')[0]).toEqual(homeLink);

    const user = userEvent.setup();
    await user.click(catLink);
    expect(document.getElementsByClassName('active')[0]).toEqual(catLink);

    await user.click(photoLink);
    expect(document.getElementsByClassName('active')[0]).toEqual(photoLink);

    await user.click(toggleLink);
    expect(document.getElementsByClassName('active')[0]).toEqual(toggleLink);
  });
});

