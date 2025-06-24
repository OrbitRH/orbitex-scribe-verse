
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUsuarios } from '@/components/empresa/hooks/useUsuarios';
import { UsersTable } from '@/components/empresa/components/UsersTable';
import { EmptyUsersState } from '@/components/empresa/components/EmptyUsersState';

export function UsuariosTab() {
  const { usuarios, isLoading, handleRemoveRole } = useUsuarios();

  if (isLoading) {
    return <div>Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Usuários do Sistema</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie usuários e seus roles no sistema.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Usuários
          </CardTitle>
          <CardDescription>
            Visualize todos os usuários cadastrados e seus respectivos roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usuarios && usuarios.length > 0 ? (
            <UsersTable usuarios={usuarios} onRemoveRole={handleRemoveRole} />
          ) : (
            <EmptyUsersState />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
