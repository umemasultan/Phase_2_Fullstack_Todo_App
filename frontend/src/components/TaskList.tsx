'use client'

import TaskItem from './TaskItem'
import type { Task } from '@/types'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: number) => Promise<void>
  onUpdate: (taskId: number, title: string, description: string, completed: boolean) => Promise<void>
  onDelete: (taskId: number) => Promise<void>
}

export default function TaskList({ tasks, onToggleComplete, onUpdate, onDelete }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
