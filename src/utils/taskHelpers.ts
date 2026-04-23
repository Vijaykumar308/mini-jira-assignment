import type { Priority, Status, Task } from '@/types/task';

export function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function now(): string {
  return new Date().toISOString();
}

export function formatDueDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function isDueSoon(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const due = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 2 && diff >= 0;
}

export function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const due = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
};

export const COLUMN_ORDER: Status[] = ['todo', 'in-progress', 'done'];

export function getTasksByStatus(tasks: Task[], status: Status): Task[] {
  return tasks.filter((t) => t.status === status);
}

export const SEED_TASKS: Task[] = [
  {
    id: 'seed_1',
    title: 'Define Project MVP Scope',
    description: 'Outline the core features required for the first release of the Workly task manager.',
    priority: 'high',
    status: 'todo',
    dueDate: '2024-10-12',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'seed_2',
    title: 'Design System Audit',
    description: 'Review existing shadcn components and ensure accessibility standards are met.',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-10-15',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'seed_3',
    title: 'Market Research',
    description: 'Analyze competitor pricing and feature sets to refine our market positioning.',
    priority: 'low',
    status: 'todo',
    dueDate: '2024-10-20',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'seed_4',
    title: 'Auth Flow Implementation',
    description: 'Integrate secure login and signup flows using the new identity provider.',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-10-10',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'seed_5',
    title: 'API Rate Limiting',
    description: 'Set up Redis-based rate limiting for the public API endpoints.',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-10-11',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'seed_6',
    title: 'Initial Database Schema',
    description: 'Completed the migration for the core user and workspace tables.',
    priority: 'medium',
    status: 'done',
    dueDate: '2024-10-05',
    createdAt: now(),
    updatedAt: now(),
  },
];
