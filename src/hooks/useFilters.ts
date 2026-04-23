import { useState, useMemo, useCallback } from 'react';
import type { Task, Priority, Status } from '@/types/task';
import { useDebounce } from './useDebounce';

export interface FilterState {
  search: string;
  priority: Priority | 'all';
  status: Status | 'all';
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  priority: 'all',
  status: 'all',
};

export function useFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !debouncedSearch ||
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;

      const matchesStatus =
        filters.status === 'all' || task.status === filters.status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, debouncedSearch, filters.priority, filters.status]);

  const setSearch = useCallback((search: string) => {
    setFilters((f) => ({ ...f, search }));
  }, []);

  const setPriority = useCallback((priority: Priority | 'all') => {
    setFilters((f) => ({ ...f, priority }));
  }, []);

  const setStatus = useCallback((status: Status | 'all') => {
    setFilters((f) => ({ ...f, status }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.priority !== 'all' ||
    filters.status !== 'all';

  return {
    filters,
    filteredTasks,
    setSearch,
    setPriority,
    setStatus,
    clearFilters,
    hasActiveFilters,
  };
}
