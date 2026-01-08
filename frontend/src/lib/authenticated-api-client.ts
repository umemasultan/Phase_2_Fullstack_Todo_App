/**
 * Authenticated API client
 *
 * Extends the base API client with authentication support
 */

import { tokenStorage } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const authenticatedApiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const token = tokenStorage.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, clear it
        tokenStorage.removeToken()
        throw new Error('Authentication expired. Please sign in again.')
      }
      throw new Error(`API error: ${response.statusText}`)
    }

    return response.json()
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const token = tokenStorage.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      if (response.status === 401) {
        tokenStorage.removeToken()
        throw new Error('Authentication expired. Please sign in again.')
      }
      throw new Error(`API error: ${response.statusText}`)
    }

    return response.json()
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const token = tokenStorage.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      if (response.status === 401) {
        tokenStorage.removeToken()
        throw new Error('Authentication expired. Please sign in again.')
      }
      throw new Error(`API error: ${response.statusText}`)
    }

    return response.json()
  },

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const token = tokenStorage.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      if (response.status === 401) {
        tokenStorage.removeToken()
        throw new Error('Authentication expired. Please sign in again.')
      }
      throw new Error(`API error: ${response.statusText}`)
    }

    return response.json()
  },

  async delete<T>(endpoint: string): Promise<T> {
    const token = tokenStorage.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        tokenStorage.removeToken()
        throw new Error('Authentication expired. Please sign in again.')
      }
      throw new Error(`API error: ${response.statusText}`)
    }

    return response.json()
  },
}
