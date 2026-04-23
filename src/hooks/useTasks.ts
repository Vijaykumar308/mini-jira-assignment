import { useReducer, useCallback, useEffect } from 'react';
import type { Task, TaskDraft, Status } from '@/types/task';
import { loadTasks, saveTasks } from '@/utils/storage';
import { generateId, now, SEED_TASKS } from '@/utils/taskHelpers';

type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { taskId: string; status: Status } };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload);
    case 'MOVE_TASK':
      return state.map((t) =>
        t.id === action.payload.taskId
          ? { ...t, status: action.payload.status, updatedAt: now() }
          : t,
      );
    default:
      return state;
  }
}

function init(): Task[] {
  const stored = loadTasks();
  return stored.length > 0 ? stored : SEED_TASKS;
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((draft: TaskDraft) => {
    const task: Task = {
      ...draft,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
    };
    dispatch({ type: 'ADD_TASK', payload: task });
  }, []);

  const updateTask = useCallback((task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, updatedAt: now() } });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const moveTask = useCallback((taskId: string, status: Status) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, status } });
  }, []);

  return { tasks, addTask, updateTask, deleteTask, moveTask };
}
