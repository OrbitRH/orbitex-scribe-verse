
import React from 'react';
import { Users } from 'lucide-react';

export function EmptyUsersState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Users className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Nenhum usuário encontrado</h3>
      <p className="text-muted-foreground text-center">
        Os usuários aparecerão aqui quando se cadastrarem no sistema.
      </p>
    </div>
  );
}
