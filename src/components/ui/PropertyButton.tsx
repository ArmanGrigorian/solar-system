import type { ReactNode } from 'react';

interface PropertyButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'danger';
}

export function PropertyButton({ onClick, children, variant = 'primary' }: PropertyButtonProps) {
  const baseClasses = "flex-1 p-2 rounded-sm flex items-center justify-center gap-2 cursor-pointer text-[0.85rem] font-medium border transition-colors";
  const variants = {
    primary: "bg-bg-panel-hover text-text-primary border-border-light hover:bg-glass-bg",
    danger: "bg-accent-danger/10 text-accent-danger border-accent-danger/20 hover:bg-accent-danger/20"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}
