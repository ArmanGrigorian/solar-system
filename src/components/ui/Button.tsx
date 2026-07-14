import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export function Button({ children, variant = 'primary', fullWidth = false, className = '', ...props }: ButtonProps) {
  const baseClasses = "flex items-center justify-center gap-2 rounded-sm font-medium cursor-pointer transition-colors";
  const widthClass = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: "bg-accent-primary text-white border-none hover:bg-accent-primary-hover px-4 py-2",
    secondary: "bg-bg-secondary text-text-primary border border-border-color hover:bg-bg-panel-hover hover:border-border-light px-4 py-2",
    danger: "bg-accent-danger/10 text-accent-danger border border-accent-danger/20 hover:bg-accent-danger/20 px-4 py-2",
    ghost: "bg-transparent text-text-muted border-none hover:text-text-primary py-2"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
