import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();
  const mockOnFilterClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Search or filter results');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays the current search value', () => {
    const searchValue = 'Rick Sanchez';
    render(
      <SearchBar 
        value={searchValue} 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const searchInput = screen.getByDisplayValue(searchValue);
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onChange when user types in search input', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Search or filter results');
    fireEvent.change(searchInput, { target: { value: 'Morty' } });

    expect(mockOnChange).toHaveBeenCalledWith('Morty');
  });

  it('calls onFilterClick when filter button is clicked', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const filterButton = screen.getByLabelText('Filter');
    fireEvent.click(filterButton);

    expect(mockOnFilterClick).toHaveBeenCalled();
  });

  it('renders search icon', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const searchIcon = screen.getByRole('img', { hidden: true });
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders filter icon', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const filterButton = screen.getByLabelText('Filter');
    expect(filterButton).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const searchContainer = screen.getByPlaceholderText('Search or filter results').parentElement;
    expect(searchContainer).toHaveClass('relative', 'flex', 'items-center', 'justify-center', 'rounded-lg', 'bg-gray-100');
  });
}); 