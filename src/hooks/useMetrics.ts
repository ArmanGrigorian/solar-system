import { useMemo } from 'react';
import type { SolarPanel, ProjectMetrics } from '@/types';

/**
 * Hook for calculating financial and performance metrics based on the current solar array.
 * 
 * @param panels - Current array of solar panels in the workspace.
 * @returns Calculated metrics.
 */

export function useMetrics(panels: SolarPanel[]): ProjectMetrics {
  return useMemo(() => {
    const panelCount = panels.length;
    const totalCapacity = panels.reduce((sum, panel) => sum + panel.wattage, 0) / 1000; // kW
    
    const estAnnualProduction = totalCapacity * 4 * 365 * 0.8;
    
    const systemCost = panels.reduce((sum, panel) => sum + (panel.wattage * 3), 0);
    
    const estAnnualSavings = estAnnualProduction * 0.15;
    
    const paybackPeriod = estAnnualSavings > 0 ? systemCost / estAnnualSavings : 0;
    
    const co2Offset = (estAnnualProduction * 0.85) / 2000;

    return {
      totalCapacity,
      panelCount,
      estAnnualProduction,
      systemCost,
      estAnnualSavings,
      paybackPeriod,
      co2Offset
    };
  }, [panels]);
}
