import { useState, useEffect, useMemo } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Plus, Moon, Sun } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { KanbanColumn } from './components/KanbanColumn';
import type { Task, TaskFilters, Status } from './types';

const COLUMNS: Status[] = ['Todo', 'In Progress', 'Done'];

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useLocalStorage();
  const [filters, setFilters] = useState<TaskFilters>({
    priority: 'All',
    status: 'All',
    search: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('workly-dark-mode') === 'true'
  );
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(filters.search, 300);

  // Filter tasks based on filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           task.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesPriority = filters.priority === 'All' || task.priority === filters.priority;
      const matchesStatus = filters.status === 'All' || task.status === filters.status;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, debouncedSearch, filters]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped = COLUMNS.reduce((acc, status) => {
      acc[status] = filteredTasks.filter(task => task.status === status);
      return acc;
    }, {} as Record<Status, Task[]>);
    
    return grouped;
  }, [filteredTasks]);

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as Status;
    
    if (newStatus && COLUMNS.includes(newStatus)) {
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        updateTask(taskId, { status: newStatus });
        
        // Show notification
        setShowNotification(`Task "${task.title}" moved to ${newStatus}`);
        setTimeout(() => setShowNotification(null), 3000);
      }
    }
  };

  // Handle task submission
  const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
    } else {
      addTask(taskData);
    }
  };

  // Handle task edit
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Handle task delete
  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      deleteTask(id);
      setShowNotification(`Task "${task.title}" deleted`);
      setTimeout(() => setShowNotification(null), 3000);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('workly-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Workly</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => {
                  setEditingTask(undefined);
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Notification */}
        {showNotification && (
          <div className="mb-4 p-3 bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300 rounded-lg border border-success-200 dark:border-success-700 animate-slide-up">
            {showNotification}
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar filters={filters} onFiltersChange={setFilters} />

        {/* Kanban Board */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COLUMNS.map(status => (
              <KanbanColumn
                key={status}
                title={status}
                status={status}
                tasks={tasksByStatus[status]}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DndContext>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
}

export default App;
