import { useState, useEffect } from 'react';
import type { Task } from '../types';

const STORAGE_KEY = 'workly-tasks';

export function useLocalStorage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Initialize with sample data
        const sampleTasks: Task[] = [
          {
            id: '1',
            title: 'Global Navigation Audit',
            description: 'Review the consistency of navigation patterns across the entire mobile platform for UX improvements.',
            priority: 'High',
            status: 'Todo',
            dueDate: '2024-10-12',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Dark Theme Color Refinement',
            description: 'Adjust secondary background shades to improve contrast on high-brightness OLED screens.',
            priority: 'Medium',
            status: 'Todo',
            dueDate: '2024-10-16',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'API Performance Sync',
            description: 'Optimizing GraphQL queries for the dashboard to reduce TTFB by 150ms.',
            priority: 'High',
            status: 'In Progress',
            dueDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        setTasks(sampleTasks);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      if (tasks.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
