export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  priority: Priority | 'All';
  status: Status | 'All';
  search: string;
}

export interface Column {
  id: Status;
  title: string;
  tasks: Task[];
}
