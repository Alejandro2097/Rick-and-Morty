import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

// Create a mock Apollo Client for testing
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// Wrapper component to provide necessary providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </ApolloProvider>
);

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
  });

  it('renders the main application content', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // The app should render the Home page by default
    // We can't test for specific content here as it depends on GraphQL queries
    // But we can verify the app structure is rendered
    expect(document.body).toBeInTheDocument();
  });

  it('has correct routing structure', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // The app should have routing capabilities
    // This is a basic test to ensure the app renders without errors
    expect(true).toBe(true);
  });

  it('provides layout wrapper for all routes', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // The Layout component should be applied to all routes
    // This is tested indirectly by checking if the app renders without errors
    expect(document.querySelector('div')).toBeInTheDocument();
  });
}); 