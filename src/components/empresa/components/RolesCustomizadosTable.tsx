
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RolesCustomizadosTableProps {
  rolesCustomizados: any[];
  onEdit: (role: any) => void;
  onDelete: (roleId: string) => void;
}

export function RolesCustomizadosTable({ rolesCustomizados, onEdit, onDelete }: RolesCustomizadosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Permissões</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rolesCustomizados.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: role.cor }}
                />
                {role.nome}
              </div>
            </TableCell>
            <TableCell>{role.descricao}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {role.roles_permissoes?.length || 0} permissões
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={role.ativo ? 'outline' : 'destructive'}>
                {role.ativo ? 'Ativo' : 'Inativo'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(role)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(role.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
