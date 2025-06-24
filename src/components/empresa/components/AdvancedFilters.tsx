
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, X, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface FilterState {
  searchText: string;
  startDate?: Date;
  endDate?: Date;
  status: string[];
  minValue?: number;
  maxValue?: number;
  cfop?: string;
}

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
  const statusOptions = [
    { value: 'autorizada', label: 'Autorizada' },
    { value: 'emitida', label: 'Emitida' },
    { value: 'cancelada', label: 'Cancelada' },
    { value: 'rejeitada', label: 'Rejeitada' }
  ];

  const periodPresets = [
    { label: 'Últimos 7 dias', days: 7 },
    { label: 'Últimos 30 dias', days: 30 },
    { label: 'Últimos 90 dias', days: 90 },
    { label: 'Este ano', days: 365 }
  ];

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

  const activeFiltersCount = [
    filters.searchText,
    filters.startDate,
    filters.endDate,
    filters.status.length > 0 ? 'status' : null,
    filters.minValue,
    filters.maxValue,
    filters.cfop
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por número da NF, produto, fornecedor..."
          value={filters.searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.searchText && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Advanced Filters */}
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

            {/* Period Presets */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Período</Label>
              <div className="grid grid-cols-2 gap-2">
                {periodPresets.map((preset) => (
                  <Button
                    key={preset.days}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePeriodPreset(preset.days)}
                    className="justify-start"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? format(filters.startDate, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={(date) => onFiltersChange({ ...filters, startDate: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? format(filters.endDate, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.endDate}
                      onSelect={(date) => onFiltersChange({ ...filters, endDate: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={filters.status.includes(option.value) ? "default" : "outline"}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleStatusToggle(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Value Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Valor Mínimo</Label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={filters.minValue || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    minValue: e.target.value ? parseFloat(e.target.value) : undefined 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Valor Máximo</Label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={filters.maxValue || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    maxValue: e.target.value ? parseFloat(e.target.value) : undefined 
                  })}
                />
              </div>
            </div>

            {/* CFOP Filter */}
            <div className="space-y-2">
              <Label className="text-sm">CFOP</Label>
              <Select
                value={filters.cfop || ''}
                onValueChange={(value) => onFiltersChange({ ...filters, cfop: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar CFOP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="1102">1102 - Compra para comercialização</SelectItem>
                  <SelectItem value="5102">5102 - Venda de mercadoria</SelectItem>
                  <SelectItem value="1101">1101 - Compra para industrialização</SelectItem>
                  <SelectItem value="5101">5101 - Venda de produção</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          
          {filters.searchText && (
            <Badge variant="secondary" className="gap-1">
              Busca: {filters.searchText}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          
          {filters.startDate && (
            <Badge variant="secondary" className="gap-1">
              De: {format(filters.startDate, "dd/MM/yyyy")}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, startDate: undefined })}
              />
            </Badge>
          )}
          
          {filters.endDate && (
            <Badge variant="secondary" className="gap-1">
              Até: {format(filters.endDate, "dd/MM/yyyy")}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, endDate: undefined })}
              />
            </Badge>
          )}
          
          {filters.status.map(status => (
            <Badge key={status} variant="secondary" className="gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleStatusToggle(status)}
              />
            </Badge>
          ))}
          
          {(filters.minValue || filters.maxValue) && (
            <Badge variant="secondary" className="gap-1">
              Valor: {filters.minValue ? `R$ ${filters.minValue}` : '0'} - {filters.maxValue ? `R$ ${filters.maxValue}` : '∞'}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, minValue: undefined, maxValue: undefined })}
              />
            </Badge>
          )}
          
          {filters.cfop && (
            <Badge variant="secondary" className="gap-1">
              CFOP: {filters.cfop}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, cfop: undefined })}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </div>
      )}
    </div>
  );
}
