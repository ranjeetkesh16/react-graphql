import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client/react';
import App from './App';

jest.mock('@apollo/client', () => ({
  gql: (parts) => parts.join(''),
}));

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

beforeEach(() => {
  useQuery.mockReset();
});

test('renders a loading message while todos are loading', () => {
  useQuery.mockReturnValue({ loading: true });

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Loading...' })).toBeInTheDocument();
});

test('renders todos and their user details', () => {
  useQuery.mockReturnValue({
    loading: false,
    data: {
      getTodos: [
        {
          id: 1,
          title: 'Review pull request',
          completed: true,
          userId: 7,
          user: {
            name: 'Ranjeet',
            email: 'ranjeet@example.com',
            phone: '555-0100',
          },
        },
      ],
    },
  });

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Todo List' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Review pull request' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Yes' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Ranjeet' })).toBeInTheDocument();
});

test('renders an error message when loading todos fails', () => {
  useQuery.mockReturnValue({
    loading: false,
    error: new Error('Request failed'),
  });

  render(<App />);

  expect(screen.getByText('Error loading todos: Request failed')).toBeInTheDocument();
});
