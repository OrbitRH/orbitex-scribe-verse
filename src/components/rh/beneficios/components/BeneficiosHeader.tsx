
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

interface BeneficiosHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewBeneficio: () => void;
}

export function BeneficiosHeader({ searchTerm, onSearchChange, onNewBeneficio }: BeneficiosHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar benefícios..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
      </div>
      <Button onClick={onNewBeneficio}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Benefício
      </Button>
    </div>
  );
}
