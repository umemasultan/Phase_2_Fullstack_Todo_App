/**
 * Task type - matches backend Task model
 */
export interface Task {
  id: number
  user_id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

/**
 * Task creation payload
 */
export interface TaskCreate {
  title: string
  description?: string
}

/**
 * Task update payload
 */
export interface TaskUpdate {
  title?: string
  description?: string | null
  completed?: boolean
}

/**
 * Task with user information
 */
export interface TaskWithUser extends Task {
  user: {
    id: number
    email: string
  }
}
