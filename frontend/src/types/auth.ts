/**
 * Authentication types
 */

export interface AuthTokenResponse {
  access_token: string
  token_type: string
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
}

export interface SignupCredentials {
  email: string
  password: string
}

export interface SigninCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  email: string
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
