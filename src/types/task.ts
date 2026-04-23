export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TaskDraft = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
