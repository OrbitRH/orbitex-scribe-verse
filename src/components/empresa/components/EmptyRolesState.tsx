
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Plus } from 'lucide-react';

interface EmptyRolesStateProps {
  onAddRole: () => void;
}

export function EmptyRolesState({ onAddRole }: EmptyRolesStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Shield className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Nenhum role customizado</h3>
      <p className="text-muted-foreground text-center mb-4">
        Crie roles personalizados para atender às necessidades específicas da empresa.
      </p>
      <Button onClick={onAddRole}>
        <Plus className="h-4 w-4 mr-2" />
        Criar Primeiro Role
      </Button>
    </div>
  );
}
