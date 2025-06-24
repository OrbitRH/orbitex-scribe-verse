
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CFOPFilterProps {
  value?: string;
  onChange: (value?: string) => void;
}

const cfopOptions = [
  { value: '1102', label: '1102 - Compra para comercialização' },
  { value: '5102', label: '5102 - Venda de mercadoria' },
  { value: '1101', label: '1101 - Compra para industrialização' },
  { value: '5101', label: '5101 - Venda de produção' }
];

export function CFOPFilter({ value, onChange }: CFOPFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">CFOP</Label>
      <Select
        value={value || 'todos'}
        onValueChange={(val) => onChange(val === 'todos' ? undefined : val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecionar CFOP" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          {cfopOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
