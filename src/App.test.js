import App from './App';
import { render, screen } from '@testing-library/react';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterEach(() => jest.useRealTimers());

test('renders without crashing and shows the auth loading state', () => {
  jest.useFakeTimers();
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
