'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, tokenStorage } from '@/lib/auth'
import type { AuthUser, SignupCredentials, SigninCredentials } from '@/types/auth'

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  signup: (credentials: SignupCredentials) => Promise<void>
  signin: (credentials: SigninCredentials) => Promise<void>
  signout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load token and user on mount
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = tokenStorage.getToken()
      if (savedToken) {
        try {
          const userData = await authApi.getCurrentUser(savedToken)
          setUser(userData)
          setToken(savedToken)
        } catch {
          // Token is invalid, clear it
          tokenStorage.removeToken()
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const signup = async (credentials: SignupCredentials) => {
    const response = await authApi.signup(credentials)
    setUser(response.user)
    setToken(response.access_token)
    tokenStorage.setToken(response.access_token)
  }

  const signin = async (credentials: SigninCredentials) => {
    const response = await authApi.signin(credentials)
    setUser(response.user)
    setToken(response.access_token)
    tokenStorage.setToken(response.access_token)
  }

  const signout = () => {
    setUser(null)
    setToken(null)
    tokenStorage.removeToken()
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    signup,
    signin,
    signout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
