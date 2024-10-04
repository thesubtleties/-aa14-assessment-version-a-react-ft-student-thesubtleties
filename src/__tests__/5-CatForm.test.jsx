import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, createBrowserRouter, createMemoryRouter,
         BrowserRouter } from 'react-router-dom';
import CatForm from '../components/CatForm';

vi.mock('../components/FruitsIndex', () => {
  return {
    default: () => <>Fruits Index</>
  }
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
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

const consoleSpy = vi.spyOn(global.console, 'log').mockImplementation();

describe('(14 points) CatForm', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it ('(4 points) should have a controlled input for Name that shows a "Name field is required" error (only) when name is blank', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    expect(nameInput).toHaveValue('');

    // Initial blank form should trigger error
    expect(screen.getByText(/Name field is required/)).toBeInTheDocument();
    expect(screen.queryByText(/Name must be fewer than 30 characters/)).not.toBeInTheDocument();

    // Error should disappear as user types
    await user.type(nameInput, 'C');
    expect(nameInput).toHaveValue('C');
    await waitFor(() => expect(screen.queryByText(/Name field is required/)).not.toBeInTheDocument());
    expect(screen.queryByText(/Name must be fewer than 30 characters/)).not.toBeInTheDocument();
  });

  it ('(1 point) should show a "Name must be fewer than 30 characters" error if name is too long', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await user.type(nameInput, 'This name is much more than 30 characters long.');
    expect(await screen.findByText(/Name must be fewer than 30 characters/)).toBeInTheDocument();
    expect(screen.queryByText(/Name field is required/)).not.toBeInTheDocument();
  });

  it ('(2 points) should have a controlled input that defaults to "orange" for the color dropdown', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const colorInput = screen.getByRole('combobox', { name: /color/i });
    expect(colorInput).toHaveValue('orange');
    await user.selectOptions(colorInput, screen.getByRole('option', { name: 'black' }));
    expect(colorInput).toHaveValue('black');
  });

  it ('(2 points) should have a controlled input that defaults to 0 for the age field', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const ageInput = screen.getByRole('spinbutton', { name: /age/i });
    expect(ageInput).toHaveValue(0);
    await user.clear(ageInput);
    await user.type(ageInput, '10');
    expect(ageInput).toHaveValue(10);
  });

  it ('(1 point) should show an "Age must be between 0 and 30" error if age is less than 0', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const ageInput = screen.getByRole('spinbutton', { name: /age/i });
    await user.clear(ageInput);
    await user.type(ageInput, '-1');
    expect(await screen.findByText(/Age must be between 0 and 30/)).toBeInTheDocument();
  });

  it ('(1 point) should show an "Age must be between 0 and 30" error if age is greater than 30', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const ageInput = screen.getByRole('spinbutton', { name: /age/i });
    await user.clear(ageInput);
    await user.type(ageInput, '31');
    expect(await screen.findByText(/Age must be between 0 and 30/)).toBeInTheDocument();
  });

  it ('(1 point) should disable the submit button (only) when there are errors', async () => {
    render (
      <MemoryRouter>
        <CatForm />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Create Cat'});
    const nameInput = screen.getByRole('textbox', { name: /name/i });

    // Button should start disabled because Name is blank
    expect(submitButton).toBeDisabled();
    await user.type(nameInput, 'Chloe');
    expect(submitButton).toBeEnabled();
  });

  it ('(1 point) should console log the form values and redirect to "/" when submitted', async () => {
    const App = await initializeRouter("/cats/new");
    render(<App />);

    const submitButton = screen.getByRole('button', { name: 'Create Cat'});
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const ageInput = screen.getByRole('spinbutton', { name: /age/i });
    const colorInput = screen.getByRole('combobox', { name: /color/i });

    await user.type(nameInput, 'Chloe');
    await user.clear(ageInput);
    await user.type(ageInput, '10');
    await user.selectOptions(colorInput, screen.getByRole('option', { name: 'brown' }));
    expect(submitButton).toBeEnabled(); // Will fail if an input is incorrect
    await user.click(submitButton);

    // Expects route '/' to display the Cats Index
    expect(screen.getByText('Cats Index')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith({ name: 'Chloe', age: '10', color: 'brown' });
  });

  it ('(1 point) should be invoked by the App component at the "/cats/new" route', async () => {
    const App = await initializeRouter("/cats/new");
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Create a Cat', level: 2 })).toBeInTheDocument();
  });
})

