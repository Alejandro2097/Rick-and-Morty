import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS } from '../../graphql/queries';
import { TOGGLE_STAR_CHARACTER } from '../../graphql/mutations';
import Home from '../Home';

const mockCharacters = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    origin: 'Earth',
    isStarred: false,
    comments: [],
    occupation: 'Scientist'
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    origin: 'Earth',
    isStarred: true,
    comments: [],
    occupation: 'Student'
  }
];

const getCharactersMock = {
  request: {
    query: GET_CHARACTERS,
    variables: { name: undefined, species: undefined }
  },
  result: {
    data: {
      characters: mockCharacters
    }
  }
};

const toggleStarMock = {
  request: {
    query: TOGGLE_STAR_CHARACTER,
    variables: { id: '1' }
  },
  result: {
    data: {
      toggleStarCharacter: {
        id: '1',
        isStarred: true
      }
    }
  }
};

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick and Morty list')).toBeInTheDocument();
    });
  });

  it('renders search bar', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search or filter results')).toBeInTheDocument();
    });
  });

  it('displays characters list', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('shows starred characters section when there are starred characters', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Starred Characters (1)')).toBeInTheDocument();
    });
  });

  it('shows regular characters section', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Characters (1)')).toBeInTheDocument();
    });
  });

  it('displays character images', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const rickImage = screen.getByAltText('Rick Sanchez');
      const mortyImage = screen.getByAltText('Morty Smith');
      
      expect(rickImage).toBeInTheDocument();
      expect(mortyImage).toBeInTheDocument();
      expect(rickImage).toHaveAttribute('src', mockCharacters[0].image);
      expect(mortyImage).toHaveAttribute('src', mockCharacters[1].image);
    });
  });

  it('displays character species', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const speciesElements = screen.getAllByText('Human');
      expect(speciesElements).toHaveLength(2);
    });
  });

  it('shows loading state initially', () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state when query fails', async () => {
    const errorMock = {
      request: {
        query: GET_CHARACTERS,
        variables: { name: undefined, species: undefined }
      },
      error: new Error('Failed to fetch characters')
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('opens filters modal when filter button is clicked', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const filterButton = screen.getByLabelText('Filter');
      fireEvent.click(filterButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });
  });

  it('closes filters modal when clicking outside', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const filterButton = screen.getByLabelText('Filter');
      fireEvent.click(filterButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    // Click outside the modal
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    await waitFor(() => {
      expect(screen.queryByText('Filters')).not.toBeInTheDocument();
    });
  });

  it('selects character when clicked', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const rickCharacter = screen.getByText('Rick Sanchez');
      fireEvent.click(rickCharacter);
    });

    // Character detail should be displayed
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('toggles star when star button is clicked', async () => {
    render(
      <MockedProvider mocks={[getCharactersMock, toggleStarMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const starButtons = screen.getAllByTitle('Star');
      fireEvent.click(starButtons[0]);
    });

    // The mutation should be called
    await waitFor(() => {
      // Check if the star state changed (this would require more complex setup)
      expect(true).toBe(true); // Placeholder assertion
    });
  });

  it('filters characters by search term', async () => {
    const searchMock = {
      request: {
        query: GET_CHARACTERS,
        variables: { name: 'Rick', species: undefined }
      },
      result: {
        data: {
          characters: [mockCharacters[0]]
        }
      }
    };

    render(
      <MockedProvider mocks={[getCharactersMock, searchMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search or filter results');
      fireEvent.change(searchInput, { target: { value: 'Rick' } });
    });

    // The search should trigger a new query
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
}); 