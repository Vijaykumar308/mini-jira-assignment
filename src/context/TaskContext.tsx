import { createContext, useContext } from 'react';
import type { Task, TaskDraft, Status } from '@/types/task';

interface TaskContextValue {
  addTask: (draft: TaskDraft) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, status: Status) => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used inside TaskProvider');
  return ctx;
}
