'use client'

import { useState } from 'react'
import type { Task } from '@/types'

interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: number) => Promise<void>
  onUpdate: (taskId: number, title: string, description: string, completed: boolean) => Promise<void>
  onDelete: (taskId: number) => Promise<void>
}

export default function TaskItem({ task, onToggleComplete, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleToggle = async () => {
    try {
      setIsLoading(true)
      await onToggleComplete(task.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      await onUpdate(task.id, title, description, task.completed)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDescription(task.description || '')
    setError('')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      setIsLoading(true)
      await onDelete(task.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
      setIsLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-5">
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Task title"
            disabled={isLoading}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Task description (optional)"
            rows={3}
            disabled={isLoading}
          />
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-xl font-medium hover:bg-gray-800 hover:text-white transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800/60 hover:border-gray-600 transition-all group">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className="mt-0.5 flex-shrink-0"
        >
          <div
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 shadow-lg shadow-blue-500/30'
                : 'border-gray-600 hover:border-blue-500 hover:bg-blue-500/10'
            }`}
          >
            {task.completed && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-base font-semibold transition-colors ${
              task.completed ? 'line-through text-gray-500' : 'text-white'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-2 text-sm leading-relaxed ${task.completed ? 'text-gray-500' : 'text-gray-400'}`}>
              {task.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {new Date(task.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-2.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl disabled:opacity-50 transition-all"
            title="Edit task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl disabled:opacity-50 transition-all"
            title="Delete task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}
