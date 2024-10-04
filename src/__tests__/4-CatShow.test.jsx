import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'react-router-dom';
import App from '../App';
import CatShow from '../components/CatShow';
import cats from '../mockData/cats.json';

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual, // use actual React Router for everything but createBrowserRouter
    useParams: vi.fn(),
    createBrowserRouter: (routes) => {
      return actual.createMemoryRouter(routes, {
        initialEntries: ["/cats/1"]
      });
    },
    BrowserRouter: (props) => {
      return actual.MemoryRouter({...props, initialEntries: ["/cats/1"]});
    }
  }
});

describe('(7 points) CatShow', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => ({ catId: "1" }));
  });

  it('(2 points) should render an h2 with the name of the cat', () => {
    const { rerender } = render(<CatShow cats={cats} />);
    expect(screen.getByRole('heading', { name: 'Fluffy', level: 2 })).toBeInTheDocument();

    useParams.mockReturnValueOnce({ catId: "2" });
    rerender(<CatShow cats={cats} />);
    expect(screen.getByRole('heading', { name: 'Queen', level: 2 })).toBeInTheDocument();
  });

  it('(2 points) should render the color of the cat', () => {
    const { rerender } = render(<CatShow cats={cats} />);
    expect(screen.getByText(/orange/i)).toBeInTheDocument();
    expect(screen.queryByText(/yellow/i)).not.toBeInTheDocument();

    useParams.mockReturnValueOnce({ catId: "2" });
    rerender(<CatShow cats={cats} />);
    expect(screen.getByText(/yellow/i)).toBeInTheDocument();
    expect(screen.queryByText(/orange/i)).not.toBeInTheDocument();
  });

  it('(2 point) should render the "Age: <age>" of the cat', () => {
    const { rerender } = render(<CatShow cats={cats} />);
    expect(screen.getByText('Age: 2')).toBeInTheDocument();
    expect(screen.queryByText('Age: 14')).not.toBeInTheDocument();

    useParams.mockReturnValueOnce({ catId: "2" });
    rerender(<CatShow cats={cats} />);
    expect(screen.getByText('Age: 14')).toBeInTheDocument();
    expect(screen.queryByText('Age: 2')).not.toBeInTheDocument();
  });

  it('(1 point) should be invoked by the App component at the "/cats/:catId" route', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Fluffy', level: 2 })).toBeInTheDocument();
  });
});
