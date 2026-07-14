import { DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/format';
import type { ProjectMetrics } from '@/types';

interface FinancialSummaryProps {
  metrics: ProjectMetrics;
}

export function FinancialSummary({ metrics }: FinancialSummaryProps) {
  return (
    <div className="glass-panel p-5 bg-white/2">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign size={20} className="text-accent" />
        <h3 className="h3 text-sm">Financial Summary</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-secondary text-sm">Gross System Cost</span>
          <span className="font-medium">{formatCurrency(metrics.systemCost)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary text-sm">Est. Annual Savings</span>
          <span className="font-medium text-accent">+{formatCurrency(metrics.estAnnualSavings)}</span>
        </div>
        <div className="h-px bg-(--border-light) my-2" />
        <div className="flex justify-between">
          <span className="text-secondary text-sm">Payback Period</span>
          <span className="font-bold h3">{formatNumber(metrics.paybackPeriod, 1)} yrs</span>
        </div>
      </div>
    </div>
  );
}
