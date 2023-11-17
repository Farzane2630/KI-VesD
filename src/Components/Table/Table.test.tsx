// your-test-file.test.ts

import { render } from '@testing-library/react';
import Table from './Table';
import fetchMock from './--mokes--/node-fetch';

// Mocking the fetch function
jest.mock('node-fetch');

describe('Table component', () => {
  test('renders without crashing', async () => {
    // Mock the fetch response
    fetchMock.mockResolvedValue({
      json: async () => ([]),
    });

    render(<Table />);
    fetchMock.mockClear();
  });

});
