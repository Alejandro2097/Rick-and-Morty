import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

interface User {
  id: string
  email: string
  name?: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    setLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear Apollo cache
    client.clearStore()
  }

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
  }
} 