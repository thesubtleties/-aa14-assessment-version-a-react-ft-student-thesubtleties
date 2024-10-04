import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import PhotoShow from '../components/PhotoShow';

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual, // use actual React for everything but useContext
    useContext: vi.fn()
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual, // use actual React Router for everything but createBrowserRouter
    createBrowserRouter: (routes) => {
      return actual.createMemoryRouter(routes, {
        initialEntries: ["/photo"]
      });
    },
    BrowserRouter: (props) => {
      return actual.MemoryRouter({...props, initialEntries: ["/photo"]});
    }
  }
});

describe('(7 points) PhotoShow', () => {
  beforeEach(() => {
    useContext.mockImplementation(() => ({
      photoUrl: '/images/hello',
      photoType: 'hello',
      setPhotoType: () => {}
    }));
  });

  it ('(1 point) should render an h2 with the text "Photo Show"', () => {
    render(<PhotoShow />);

    expect(screen.getByRole('heading', { name: /Photo Show/i, level: 2 })).toBeInTheDocument();
  });

  it ('(5 points) should render an image of the context\'s photo type', () => {
    const { rerender } = render(<PhotoShow />);
    let photoImage = screen.getByRole('img');
    expect(photoImage).toHaveAttribute('src', '/images/hello');

    useContext.mockReturnValueOnce({
      photoUrl: '/images/cat',
      photoType: 'cat',
      setPhotoType: () => {}
    });

    rerender(<PhotoShow />);
    photoImage = screen.getByRole('img');
    expect(photoImage).toHaveAttribute('src', '/images/cat');
  });

  it ('(1 point) should be invoked by the App component at the "/photo" route', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Photo Show/i, level: 2 })).toBeInTheDocument();
  });
});

