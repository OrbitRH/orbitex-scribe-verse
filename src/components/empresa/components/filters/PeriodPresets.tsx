
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PeriodPresetsProps {
  onPeriodSelect: (days: number) => void;
}

const periodPresets = [
  { label: 'Últimos 7 dias', days: 7 },
  { label: 'Últimos 30 dias', days: 30 },
  { label: 'Últimos 90 dias', days: 90 },
  { label: 'Este ano', days: 365 }
];

export function PeriodPresets({ onPeriodSelect }: PeriodPresetsProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Período</Label>
      <div className="grid grid-cols-2 gap-2">
        {periodPresets.map((preset) => (
          <Button
            key={preset.days}
            variant="outline"
            size="sm"
            onClick={() => onPeriodSelect(preset.days)}
            className="justify-start"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
