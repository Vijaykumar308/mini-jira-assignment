import { memo } from 'react';

export const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-4 px-4 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>© 2024 Workly Inc.</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
        </nav>
      </div>
    </footer>
  );
});
