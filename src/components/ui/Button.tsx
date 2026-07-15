import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center gap-2 rounded-sm font-medium cursor-pointer transition-all duration-200 border px-4 py-2 active:scale-95";
  const widthClass = fullWidth ? "w-full" : "";

  const variants = {
    primary:
      "bg-accent-primary text-white border-accent-primary hover:bg-accent-primary-hover hover:border-accent-primary-hover shadow-sm",
    secondary:
      "bg-bg-panel text-text-primary border-border-color hover:bg-bg-panel-hover hover:border-border-light shadow-sm",
    danger:
      "bg-accent-danger/10 text-accent-danger border-accent-danger/20 hover:bg-accent-danger/20 shadow-sm",
    ghost:
      "bg-transparent text-text-muted border-transparent hover:text-text-primary hover:bg-white/5 shadow-none",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
