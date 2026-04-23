import { memo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import type { Priority, Status } from '@/types/task';
import type { FilterState } from '@/hooks/useFilters';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterState;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: Priority | 'all') => void;
  onStatusChange: (value: Status | 'all') => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const selectBase = cn(
  'h-8 appearance-none rounded-md border border-input bg-input/20 pl-2.5 pr-7 text-xs text-foreground',
  'outline-none cursor-pointer hover:border-border focus:border-ring focus:ring-1 focus:ring-ring/30 transition-colors',
);

export const FilterBar = memo(function FilterBar({
  filters,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Board search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Find in board..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-44 rounded-md border border-input bg-input/20 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-colors"
        />
      </div>

      {/* Priority */}
      <div className="relative">
        <select
          value={filters.priority}
          onChange={(e) => onPriorityChange(e.target.value as Priority | 'all')}
          className={selectBase}
        >
          <option value="all">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
      </div>

      {/* Status */}
      <div className="relative">
        <select
          value={filters.status}
          onChange={(e) => onStatusChange(e.target.value as Status | 'all')}
          className={selectBase}
        >
          <option value="all">Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-3" />
          Clear Filters
        </button>
      )}
    </div>
  );
});
