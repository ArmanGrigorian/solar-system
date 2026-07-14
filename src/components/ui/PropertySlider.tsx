interface PropertySliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (val: number) => void;
}

export function PropertySlider({ label, value, min, max, unit = '', onChange }: PropertySliderProps) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <div className="flex justify-between items-center">
        <span className="text-[0.85rem] text-text-secondary">{label}</span>
        <span className="text-[0.85rem] text-text-primary">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-accent-primary mt-1"
      />
    </div>
  );
}
