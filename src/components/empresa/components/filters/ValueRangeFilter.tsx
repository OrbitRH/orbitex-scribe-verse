
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ValueRangeFilterProps {
  minValue?: number;
  maxValue?: number;
  onMinValueChange: (value?: number) => void;
  onMaxValueChange: (value?: number) => void;
}

export function ValueRangeFilter({ 
  minValue, 
  maxValue, 
  onMinValueChange, 
  onMaxValueChange 
}: ValueRangeFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-sm">Valor Mínimo</Label>
        <Input
          type="number"
          placeholder="0,00"
          value={minValue || ''}
          onChange={(e) => onMinValueChange(e.target.value ? parseFloat(e.target.value) : undefined)}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Valor Máximo</Label>
        <Input
          type="number"
          placeholder="0,00"
          value={maxValue || ''}
          onChange={(e) => onMaxValueChange(e.target.value ? parseFloat(e.target.value) : undefined)}
        />
      </div>
    </div>
  );
}
