/**
 * Authentication API client
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface SignupData {
  email: string
  password: string
}

export interface SigninData {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
}

export const authApi = {
  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Signup failed')
    }

    return response.json()
  },

  /**
   * Sign in an existing user
   */
  async signin(data: SigninData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Signin failed')
    }

    return response.json()
  },

  /**
   * Get current user information
   */
  async getCurrentUser(token: string): Promise<AuthResponse['user']> {
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get current user')
    }

    return response.json()
  },
}

/**
 * Token storage utilities
 */
export const tokenStorage = {
  /**
   * Get token from storage
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem('auth_token')
  },

  /**
   * Set token in storage
   */
  setToken(token: string): void {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('auth_token', token)
  },

  /**
   * Remove token from storage
   */
  removeToken(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('auth_token')
  },
}
