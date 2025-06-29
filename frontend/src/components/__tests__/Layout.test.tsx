import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    const testMessage = 'Test content';
    render(
      <Layout>
        <div>{testMessage}</div>
      </Layout>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('has correct container styling', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    const container = screen.getByText('Test content').parentElement?.parentElement;
    expect(container).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  it('has correct main element styling', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    const mainElement = screen.getByText('Test content').parentElement;
    expect(mainElement).toHaveClass('max-w-7xl', 'mx-auto', 'py-6', 'sm:px-6', 'lg:px-8');
  });

  it('renders multiple children', () => {
    render(
      <Layout>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Layout>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('renders complex nested components', () => {
    const TestComponent = () => (
      <div>
        <h1>Title</h1>
        <p>Description</p>
        <button>Click me</button>
      </div>
    );

    render(
      <Layout>
        <TestComponent />
      </Layout>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
}); 