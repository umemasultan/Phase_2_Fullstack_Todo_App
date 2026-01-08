/**
 * User type - matches backend User model
 */
export interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
}

/**
 * User creation payload
 */
export interface UserCreate {
  email: string
}

/**
 * User update payload
 */
export interface UserUpdate {
  email?: string
}
