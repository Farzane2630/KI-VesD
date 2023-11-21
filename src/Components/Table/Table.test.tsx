import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

jest.mock('../../Hooks/useMediaQuery', () => ({
  __esModule: true,
  useMediaQuery: jest.fn(() => false),
}));


jest.mock('../../Hooks/useContext', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    backgroundColor: "#d9fadb",
    setBachgroundColor: () => { },
    headerColor: "#4CAF50",
    setHeaderColor: () => { },
    fontColor: "#000",
    setFontColor: () => { },
  })),
}));

const mockUsers = [
  { id: 1, name: 'John Doe', entry_date: '2023-01-01', salary: 50000, address: '123 Main St', phone: '555-1234' },
  // ... other mock users
];

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockUsers),
  })
);

afterEach(() => {
  global.fetch.mockClear();
});

describe('Table Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
  });

  it('renders without crashing', async () => {
    render(<Table />);
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('fetches users and renders them correctly', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', entry_date: '2023-01-01', salary: 50000, address: '123 Main St', phone: '555-1234' },
      //...
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUsers),
      })
    );

    afterEach(() => {
      global.fetch.mockClear();
    });

    test('fetches and sets users on mount', async () => {
      await act(async () => {
        render(<Table />);
      });

    render(<Table />);
  })
  expect(screen.getByText('John Doe')).toBeInTheDocument();

  // Optionally, you can also assert that fetch was called with the correct URL
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users');
});
   

  it('handles header selection correctly', () => {
    render(<Table />);

    const dataList = [
      { id: "id", value: "ID" }, { id: "name", value: "Name" }, { id: "entry_date", value: "Entry Date" },
      // ...
    ]

    dataList.forEach((_data, index) => {
      const select = screen.getAllByTestId('header')[index] as HTMLSelectElement;

      fireEvent.change(select, {
        target: { value: "ID" },
      });
      expect(select.value).toEqual(dataList[index - 1].value);
    })
  });

  it('handles search functionality correctly', () => {
    render(<Table />);
    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(screen.getByTestId('select')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    const mockUsers = Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      entry_date: `2023-01-${index + 1}`,
      salary: 50000 + index,
      address: `Address ${index + 1}`,
      phone: `555-${index + 1}`,
    }));

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUsers),
    });

    render(<Table />);

    await act(async () => { });

    const paginationButton = screen.getByRole('button', { name: /2/ });
    fireEvent.click(paginationButton);


    expect(screen.getByText('User 11')).toBeInTheDocument();
    expect(screen.getByText('User 20')).toBeInTheDocument();
    expect(screen.queryByText('User 21')).not.toBeInTheDocument();
  });

});
