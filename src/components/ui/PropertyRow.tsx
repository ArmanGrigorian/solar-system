import type { ReactNode } from 'react';

interface PropertyRowProps {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}

export function PropertyRow({ label, value, children }: PropertyRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[0.85rem] text-text-secondary">{label}</span>
      {children ? (
        children
      ) : (
        <span className="text-[0.85rem] text-text-primary">{value}</span>
      )}
    </div>
  );
}
