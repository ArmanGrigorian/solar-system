import { useMemo } from 'react';
import type { SolarPanel, ProjectMetrics, ProjectSettings } from '@/types';

/**
 * Hook for calculating financial and performance metrics based on the current solar array and project settings.
 */
export function useMetrics(panels: SolarPanel[], settings: ProjectSettings): ProjectMetrics {
  return useMemo(() => {
    const panelCount = panels.length;
    const totalCapacity = panels.reduce((sum, panel) => sum + panel.wattage, 0) / 1000; // kW
    
    // Base assumptions
    const PEAK_SUN_HOURS = 4;
    const EFFICIENCY_LOSS = 0.8;
    
    // Azimuth multiplier
    let azimuthMultiplier = 1.0;
    switch (settings.azimuth) {
      case 'South': azimuthMultiplier = 1.0; break;
      case 'SouthWest':
      case 'SouthEast': azimuthMultiplier = 0.93; break;
      case 'East':
      case 'West': azimuthMultiplier = 0.85; break;
      case 'North': azimuthMultiplier = 0.65; break;
    }

    // Pitch multiplier (simplified: best around 20-30 degrees)
    let pitchMultiplier = 1.0;
    if (settings.pitch < 10) pitchMultiplier = 0.95; // Flat roof loses a bit of self-cleaning / angle
    if (settings.pitch > 40) pitchMultiplier = 0.90; // Too steep

    const totalMultiplier = azimuthMultiplier * pitchMultiplier * EFFICIENCY_LOSS;
    
    // Calculate est annual production
    const estAnnualProduction = totalCapacity * PEAK_SUN_HOURS * 365 * totalMultiplier;
    
    // System cost (assume $3.00/W installed cost)
    const systemCost = panels.reduce((sum, panel) => sum + (panel.wattage * 3), 0);
    
    // Federal Solar Tax Credit (30%)
    const FEDERAL_TAX_CREDIT = 0.30;
    const netSystemCost = systemCost * (1 - FEDERAL_TAX_CREDIT);
    
    // Estimated savings ($0.15/kWh utility rate)
    const UTILITY_RATE = 0.15;
    const estAnnualSavings = estAnnualProduction * UTILITY_RATE;
    
    // Payback period uses Net Cost
    const paybackPeriod = estAnnualSavings > 0 ? netSystemCost / estAnnualSavings : 0;
    
    // 25-Year ROI (Assumes 2% utility inflation, ignoring panel degradation for simplicity)
    let total25YearSavings = 0;
    let currentRate = UTILITY_RATE;
    for (let i = 0; i < 25; i++) {
      total25YearSavings += estAnnualProduction * currentRate;
      currentRate *= 1.02; // 2% annual inflation
    }
    const roi25Year = netSystemCost > 0 ? ((total25YearSavings - netSystemCost) / netSystemCost) * 100 : 0;
    
    // CO2 Offset (tons)
    const co2Offset = (estAnnualProduction * 0.85) / 2000;

    return {
      totalCapacity,
      panelCount,
      estAnnualProduction,
      systemCost,
      netSystemCost,
      estAnnualSavings,
      paybackPeriod,
      roi25Year,
      co2Offset
    };
  }, [panels, settings]);
}
