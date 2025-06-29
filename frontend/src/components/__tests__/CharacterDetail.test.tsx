import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_COMMENT } from '../../graphql/mutations';
import CharacterDetail from '../CharacterDetail';

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  origin: 'Earth',
  isStarred: false,
  comments: [
    {
      id: '1',
      text: 'Great character!',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],
  occupation: 'Scientist'
};

const mockOnToggleStar = jest.fn();
const mockOnClose = jest.fn();

const addCommentMock = {
  request: {
    query: ADD_COMMENT,
    variables: { characterId: '1', text: 'New comment' }
  },
  result: {
    data: {
      addComment: {
        id: '2',
        text: 'New comment',
        createdAt: '2024-01-02T00:00:00Z'
      }
    }
  }
};

describe('CharacterDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders character information correctly', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Scientist')).toBeInTheDocument();
  });

  it('renders character image', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const characterImage = screen.getByAltText('Rick Sanchez');
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute('src', mockCharacter.image);
  });

  it('calls onToggleStar when star button is clicked', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const starButton = screen.getByTitle('Star');
    fireEvent.click(starButton);

    expect(mockOnToggleStar).toHaveBeenCalledWith(mockCharacter);
  });

  it('shows correct star button state when character is starred', () => {
    const starredCharacter = { ...mockCharacter, isStarred: true };
    
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={starredCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const starButton = screen.getByTitle('Unstar');
    expect(starButton).toBeInTheDocument();
  });

  it('renders comments section', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('displays existing comments', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('Great character!')).toBeInTheDocument();
  });

  it('shows message when no comments exist', () => {
    const characterWithoutComments = { ...mockCharacter, comments: [] };
    
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={characterWithoutComments} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('No comments yet. Be the first to comment!')).toBeInTheDocument();
  });

  it('renders comment input field', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const commentInput = screen.getByPlaceholderText('Add a comment...');
    expect(commentInput).toBeInTheDocument();
  });

  it('renders Add comment button', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const addButton = screen.getByText('Add');
    expect(addButton).toBeInTheDocument();
  });

  it('shows back button on mobile when onClose is provided', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const backButton = screen.getByLabelText('Volver');
    expect(backButton).toBeInTheDocument();
  });

  it('calls onClose when back button is clicked', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={mockCharacter} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    const backButton = screen.getByLabelText('Volver');
    fireEvent.click(backButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows fallback message when no character is provided', () => {
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={null} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('Select a character to see details')).toBeInTheDocument();
  });

  it('displays occupation as Unknown when not provided', () => {
    const characterWithoutOccupation = { ...mockCharacter, occupation: undefined };
    
    render(
      <MockedProvider mocks={[addCommentMock]} addTypename={false}>
        <CharacterDetail 
          character={characterWithoutOccupation} 
          onToggleStar={mockOnToggleStar}
          onClose={mockOnClose}
        />
      </MockedProvider>
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
}); 