
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { format } from 'date-fns';

export interface FilterState {
  searchText: string;
  startDate?: Date;
  endDate?: Date;
  status: string[];
  minValue?: number;
  maxValue?: number;
  cfop?: string;
}

interface ActiveFiltersDisplayProps {
  filters: FilterState;
  onSearchChange: (value: string) => void;
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
  onStatusToggle: (status: string) => void;
  onValueRangeChange: (min?: number, max?: number) => void;
  onCfopChange: (cfop?: string) => void;
  resultCount?: number;
}

const statusOptions = [
  { value: 'autorizada', label: 'Autorizada' },
  { value: 'emitida', label: 'Emitida' },
  { value: 'cancelada', label: 'Cancelada' },
  { value: 'rejeitada', label: 'Rejeitada' }
];

export function ActiveFiltersDisplay({ 
  filters, 
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onStatusToggle,
  onValueRangeChange,
  onCfopChange,
  resultCount 
}: ActiveFiltersDisplayProps) {
  const activeFiltersCount = [
    filters.searchText,
    filters.startDate,
    filters.endDate,
    filters.status.length > 0 ? 'status' : null,
    filters.minValue,
    filters.maxValue,
    filters.cfop
  ].filter(Boolean).length;

  if (activeFiltersCount === 0) {
    return resultCount !== undefined ? (
      <div className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
      </div>
    ) : null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Filtros ativos:</span>
        
        {filters.searchText && (
          <Badge variant="secondary" className="gap-1">
            Busca: {filters.searchText}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onSearchChange('')}
            />
          </Badge>
        )}
        
        {filters.startDate && (
          <Badge variant="secondary" className="gap-1">
            De: {format(filters.startDate, "dd/MM/yyyy")}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onStartDateChange(undefined)}
            />
          </Badge>
        )}
        
        {filters.endDate && (
          <Badge variant="secondary" className="gap-1">
            Até: {format(filters.endDate, "dd/MM/yyyy")}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onEndDateChange(undefined)}
            />
          </Badge>
        )}
        
        {filters.status.map(status => (
          <Badge key={status} variant="secondary" className="gap-1">
            {statusOptions.find(s => s.value === status)?.label}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onStatusToggle(status)}
            />
          </Badge>
        ))}
        
        {(filters.minValue || filters.maxValue) && (
          <Badge variant="secondary" className="gap-1">
            Valor: {filters.minValue ? `R$ ${filters.minValue}` : '0'} - {filters.maxValue ? `R$ ${filters.maxValue}` : '∞'}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onValueRangeChange(undefined, undefined)}
            />
          </Badge>
        )}
        
        {filters.cfop && (
          <Badge variant="secondary" className="gap-1">
            CFOP: {filters.cfop}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onCfopChange(undefined)}
            />
          </Badge>
        )}
      </div>

      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </div>
      )}
    </div>
  );
}
