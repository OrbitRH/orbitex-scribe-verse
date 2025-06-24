
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface StatusFilterProps {
  selectedStatuses: string[];
  onStatusToggle: (status: string) => void;
}

const statusOptions = [
  { value: 'autorizada', label: 'Autorizada' },
  { value: 'emitida', label: 'Emitida' },
  { value: 'cancelada', label: 'Cancelada' },
  { value: 'rejeitada', label: 'Rejeitada' }
];

export function StatusFilter({ selectedStatuses, onStatusToggle }: StatusFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Status</Label>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedStatuses.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer hover:opacity-80"
            onClick={() => onStatusToggle(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
