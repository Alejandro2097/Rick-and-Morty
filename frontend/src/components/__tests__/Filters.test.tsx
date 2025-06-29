import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';

describe('Filters', () => {
  const mockSetSelectedStatus = jest.fn();
  const mockSetSelectedSpecies = jest.fn();
  const mockSetSelectedStarred = jest.fn();
  const mockOnFilter = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filters title', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('renders Characters section', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('renders Specie section', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Specie')).toBeInTheDocument();
  });

  it('renders all character filter buttons', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Starred')).toBeInTheDocument();
    expect(screen.getByText('Others')).toBeInTheDocument();
  });

  it('renders all species filter buttons', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const allButtons = screen.getAllByText('All');
    const humanButton = screen.getByText('Human');
    const alienButton = screen.getByText('Alien');

    expect(allButtons).toHaveLength(2); // One for characters, one for species
    expect(humanButton).toBeInTheDocument();
    expect(alienButton).toBeInTheDocument();
  });

  it('calls setSelectedStarred when character filter button is clicked', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const starredButton = screen.getByText('Starred');
    fireEvent.click(starredButton);

    expect(mockSetSelectedStarred).toHaveBeenCalledWith('starred');
  });

  it('calls setSelectedSpecies when species filter button is clicked', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const humanButton = screen.getByText('Human');
    fireEvent.click(humanButton);

    expect(mockSetSelectedSpecies).toHaveBeenCalledWith('Human');
  });

  it('calls onFilter when Filter button is clicked', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    expect(mockOnFilter).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('Cerrar filtros');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies correct styling to selected character filter', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="all"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="starred"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const starredButton = screen.getByText('Starred');
    expect(starredButton).toHaveClass('bg-[#F4F1FA]', 'text-[#A259FF]', 'border-[#A259FF]');
  });

  it('applies correct styling to selected species filter', () => {
    render(
      <Filters
        selectedStatus=""
        setSelectedStatus={mockSetSelectedStatus}
        selectedSpecies="Human"
        setSelectedSpecies={mockSetSelectedSpecies}
        selectedStarred="all"
        setSelectedStarred={mockSetSelectedStarred}
        onFilter={mockOnFilter}
        onClose={mockOnClose}
      />
    );

    const humanButton = screen.getByText('Human');
    expect(humanButton).toHaveClass('bg-[#F4F1FA]', 'text-[#A259FF]', 'border-[#A259FF]');
  });
}); 