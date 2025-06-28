
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

interface ConveniosHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewConvenio: () => void;
}

export function ConveniosHeader({ searchTerm, onSearchChange, onNewConvenio }: ConveniosHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar convênios..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
      </div>
      <Button onClick={onNewConvenio}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Convênio
      </Button>
    </div>
  );
}
