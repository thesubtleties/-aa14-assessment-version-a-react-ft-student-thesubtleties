import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import TogglePhotoType from '../components/TogglePhotoType';

const mockFn = vi.fn();

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
        initialEntries: ["/toggle-photo-type"]
      });
    },
    BrowserRouter: (props) => {
      return actual.MemoryRouter({...props, initialEntries: ["/toggle-photo-type"]});
    }
  }
});

describe('(6 points) TogglePhotoType', () => {
  it ('(3 points) should change the context\'s photo type to be "cat" or "dog"', async () => {
    const setPhotoType = mockFn;
    useContext.mockImplementation(() => ({
      photoUrl: "/images/hello",
      photoType: "hello",
      setPhotoType
    }));

    render(<TogglePhotoType />);

    const cat = screen.getByRole('radio', { name: /Cat/i });
    const dog = screen.getByRole('radio', { name: /Dog/i });

    const user = userEvent.setup();
    await user.click(cat);
    expect(setPhotoType).toHaveBeenCalledWith('cat');
    await user.click(dog);
    expect(setPhotoType).toHaveBeenCalledWith('dog');
  });

  it ('(1 point) should show the cat radio button checked when context\'s photoType is "cat"', () => {
    useContext.mockImplementation(() => ({
      photoUrl: "/cat",
      photoType: "cat",
      setPhotoType: mockFn
    }));

    render(<TogglePhotoType />);

    expect(screen.getByRole('radio', { name: /Cat/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Dog/i })).not.toBeChecked();
  });

  it ('(1 point) should show the dog radio button checked when context\'s photoType is "dog"', () => {
    useContext.mockImplementation(() => ({
      photoUrl: "/dog",
      photoType: "dog",
      setPhotoType: mockFn
    }));

    render(<TogglePhotoType />);

    expect(screen.getByRole('radio', { name: /Dog/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Cat/i })).not.toBeChecked();
  });

  it ('(1 point) should be invoked by the App component at the "/toggle-photo-type" route', () => {
    useContext.mockImplementation(() => ({
      photoUrl: "/dog",
      photoType: "dog",
      setPhotoType: mockFn
    }));

    render(<App />);

    expect(screen.getByRole('heading', { name: /Cat or Dog/i, level: 2 })).toBeInTheDocument();
  });
});

