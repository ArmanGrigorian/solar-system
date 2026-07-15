import type { Azimuth, ProjectSettings } from "@/types";
import { PropertyRow } from "../ui/PropertyRow";
import { PropertySlider } from "../ui/PropertySlider";

interface SiteSettingsProps {
  settings: ProjectSettings;
  onChange: (settings: ProjectSettings) => void;
}

export function SiteSettings({ settings, onChange }: SiteSettingsProps) {
  return (
    <>
      <PropertyRow label="Azimuth">
        <select
          value={settings.azimuth}
          onChange={(e) => onChange({ ...settings, azimuth: e.target.value as Azimuth })}
          className="bg-bg-panel text-text-primary border border-border-color hover:border-accent-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary px-4 py-2 rounded-sm outline-none text-sm transition-all cursor-pointer">
          <option value="South">South</option>
          <option value="SouthEast">South-East</option>
          <option value="SouthWest">South-West</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
        </select>
      </PropertyRow>

      <PropertySlider
        label="Roof Pitch"
        value={settings.pitch}
        min={0}
        max={45}
        unit="°"
        onChange={(val) => onChange({ ...settings, pitch: val })}
      />
    </>
  );
}
