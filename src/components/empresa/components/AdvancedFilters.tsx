
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { SearchBar } from './filters/SearchBar';
import { PeriodPresets } from './filters/PeriodPresets';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { StatusFilter } from './filters/StatusFilter';
import { ValueRangeFilter } from './filters/ValueRangeFilter';
import { CFOPFilter } from './filters/CFOPFilter';
import { ActiveFiltersDisplay, FilterState } from './filters/ActiveFiltersDisplay';

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  resultCount?: number;
}

export function AdvancedFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  resultCount 
}: AdvancedFiltersProps) {
  const activeFiltersCount = [
    filters.searchText,
    filters.startDate,
    filters.endDate,
    filters.status.length > 0 ? 'status' : null,
    filters.minValue,
    filters.maxValue,
    filters.cfop
  ].filter(Boolean).length;

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchText: value });
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handlePeriodPreset = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    onFiltersChange({ ...filters, startDate, endDate });
  };

  const handleStartDateChange = (date?: Date) => {
    onFiltersChange({ ...filters, startDate: date });
  };

  const handleEndDateChange = (date?: Date) => {
    onFiltersChange({ ...filters, endDate: date });
  };

  const handleMinValueChange = (value?: number) => {
    onFiltersChange({ ...filters, minValue: value });
  };

  const handleMaxValueChange = (value?: number) => {
    onFiltersChange({ ...filters, maxValue: value });
  };

  const handleCfopChange = (cfop?: string) => {
    onFiltersChange({ ...filters, cfop });
  };

  const handleValueRangeChange = (min?: number, max?: number) => {
    onFiltersChange({ ...filters, minValue: min, maxValue: max });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar
        value={filters.searchText}
        onChange={handleSearchChange}
        placeholder="Buscar por número da NF, produto, fornecedor..."
      />

      {/* Advanced Filters Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Filter className="mr-2 h-4 w-4" />
            Filtros Avançados
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-6" align="start">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filtros Avançados</h4>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  Limpar Tudo
                </Button>
              )}
            </div>

            <PeriodPresets onPeriodSelect={handlePeriodPreset} />

            <DateRangeFilter
              startDate={filters.startDate}
              endDate={filters.endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />

            <StatusFilter
              selectedStatuses={filters.status}
              onStatusToggle={handleStatusToggle}
            />

            <ValueRangeFilter
              minValue={filters.minValue}
              maxValue={filters.maxValue}
              onMinValueChange={handleMinValueChange}
              onMaxValueChange={handleMaxValueChange}
            />

            <CFOPFilter
              value={filters.cfop}
              onChange={handleCfopChange}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      <ActiveFiltersDisplay
        filters={filters}
        onSearchChange={handleSearchChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onStatusToggle={handleStatusToggle}
        onValueRangeChange={handleValueRangeChange}
        onCfopChange={handleCfopChange}
        resultCount={resultCount}
      />
    </div>
  );
}

export type { FilterState };
