import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createBrowserRouter, createMemoryRouter,
         BrowserRouter, MemoryRouter } from 'react-router-dom';
import CatsIndex from '../components/CatsIndex';
import CatShow from '../components/CatShow';
import cats from '../mockData/cats.json';

vi.mock('../components/Navigation', () => {
  return {
    default: vi.fn(() => <>Nav Bar</>)
  }
});
vi.mock('../components/CatsIndex', () => {
  return {
    default: vi.fn(() => <>Cats Index</>)
  }
});
vi.mock('../components/CatShow', () => {
  return {
    default: vi.fn(() => <>Cat Show</>)
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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual, // use actual React Router for everything but createBrowserRouter
    createBrowserRouter: vi.fn(),
    BrowserRouter: vi.fn()
  }
});

const initializeRouter = async (path) => {
  vi.resetModules();
  createBrowserRouter.mockImplementation((routes) => {
    return createMemoryRouter(routes, {
      initialEntries: [path]
    });
  });
  BrowserRouter.mockImplementation((props) => {
    return MemoryRouter({...props, initialEntries: [path]});
  });
  return (await import("../App")).default
}

describe('(7 points) Routes', () => {
  test ('(1 point) Navigation should render on every page', async () => {
    let App = await initializeRouter("/");
    const { rerender } = render(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    App = await initializeRouter("/cats/1");
    rerender(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    App = await initializeRouter("/cats/new");
    rerender(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    App = await initializeRouter("/photo");
    rerender(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    App = await initializeRouter("/toggle-photo-type");
    rerender(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    App = await initializeRouter("/invalid-page");
    rerender(<App />);
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();
  });

  test ('(1 point) CatsIndex should render at the path of "/"', async () => {
    const App = await initializeRouter("/");
    render(<App />);

    expect(CatsIndex).toHaveBeenCalledWith(expect.objectContaining({ cats }), {});
    expect(screen.getByText(/Cats Index/)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cat Form/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Photo Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toggle Photo Type/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  test ('(1 point) CatShow should render at the path of "/cats/:catId"', async () => {
    const App = await initializeRouter("/cats/1");
    render(<App />);

    expect(CatShow).toHaveBeenCalledWith(expect.objectContaining({ cats }), {});
    expect(screen.getByText(/Cat Show/)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cats Index/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Form/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Photo Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toggle Photo Type/)).not.toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  test ('(1 point) CatForm should render at the path of "/cats/new"', async () => {
    const App = await initializeRouter("/cats/new");
    render(<App />);

    expect(screen.getByText(/Cat Form/)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cats Index/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Photo Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toggle Photo Type/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  test ('(1 point) PhotoShow should render at the path of "/photo"', async () => {
    const App = await initializeRouter("/photo");
    render(<App />);

    expect(screen.getByText(/Photo Show/)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cats Index/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Form/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toggle Photo Type/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  test ('(1 point) TogglePhotoType should render at the path of "/toggle-photo-type"', async () => {
    const App = await initializeRouter("/toggle-photo-type");
    render(<App />);

    expect(screen.getByText(/Toggle Photo Type/)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cats Index/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Form/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Photo Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  test ('(1 point) "Page Not Found" should render at all other paths', async () => {
    let randomUrl = 'q';
    while (randomUrl.length < 10) {
      randomUrl += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.random() * 26);
    }

    const App = await initializeRouter(`/${randomUrl}`);
    render(<App />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Nav Bar/)).toBeInTheDocument();

    expect(screen.queryByText(/Cats Index/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Form/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Photo Show/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toggle Photo Type/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cat Show/)).not.toBeInTheDocument();
  });
});
