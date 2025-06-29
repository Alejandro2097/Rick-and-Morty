import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { useApolloClient } from '@apollo/client';

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  useApolloClient: jest.fn(),
}));

const mockClearStore = jest.fn();
const mockUseApolloClient = useApolloClient as jest.MockedFunction<typeof useApolloClient>;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockUseApolloClient.mockReturnValue({
      clearStore: mockClearStore,
    } as any);
  });

  it('initializes with default state when no stored data', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('loads stored authentication data on mount', () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';

    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles invalid stored user data', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', 'invalid-json');

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);

    consoleSpy.mockRestore();
  });

  it('login function updates state and stores data', () => {
    const { result } = renderHook(() => useAuth());

    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';

    act(() => {
      result.current.login(mockToken, mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
  });

  it('logout function clears state and stored data', () => {
    // First, set up some stored data
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(mockClearStore).toHaveBeenCalled();
  });

  it('updateUser function updates user data', () => {
    const { result } = renderHook(() => useAuth());

    const initialUser = { id: '1', email: 'test@example.com', role: 'user' };
    const updatedUser = { id: '1', email: 'updated@example.com', role: 'admin' };

    // First login
    act(() => {
      result.current.login('test-token', initialUser);
    });

    // Then update user
    act(() => {
      result.current.updateUser(updatedUser);
    });

    expect(result.current.user).toEqual(updatedUser);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(updatedUser));
  });

  it('maintains authentication state across re-renders', () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';

    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result, rerender } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);

    rerender();

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
  });

  it('handles missing token but existing user', () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles missing user but existing token', () => {
    localStorage.setItem('token', 'test-token');

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
}); 