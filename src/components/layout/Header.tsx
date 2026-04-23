import { memo } from 'react';
import { Search, Plus, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreateTask: () => void;
}

export const Header = memo(function Header({ searchValue, onSearchChange, onCreateTask }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border/50 bg-background/95 px-4 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <LayoutGrid className="size-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold tracking-tight">Workly</span>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-0.5">
        <Button variant="ghost" size="sm" className="font-medium text-foreground">Board</Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">Timeline</Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">Reports</Button>
      </nav>

      {/* Global search */}
      <div className="hidden sm:flex flex-1 max-w-xs mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-full rounded-md border border-input bg-input/20 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button onClick={onCreateTask} size="sm" className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Create Task</span>
        </Button>
        {/* User avatar placeholder */}
        <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 ring-2 ring-border shrink-0" />
      </div>
    </header>
  );
});
