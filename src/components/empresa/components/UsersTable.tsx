
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserRolesBadges } from './UserRolesBadges';
import { UserManagementDialog } from './UserManagementDialog';

interface UsersTableProps {
  usuarios: any[];
  onRemoveRole: (userId: string, role: string) => void;
}

export function UsersTable({ usuarios, onRemoveRole }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Cadastro</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usuarios.map((usuario) => (
          <TableRow key={usuario.id}>
            <TableCell className="font-medium">
              {usuario.full_name}
            </TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>
              <UserRolesBadges
                userRoles={usuario.user_roles}
                onRemoveRole={onRemoveRole}
                userId={usuario.id}
              />
            </TableCell>
            <TableCell>
              {new Date(usuario.created_at).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell className="text-right">
              <UserManagementDialog
                user={usuario}
                isOpen={isDialogOpen && selectedUser?.id === usuario.id}
                onOpenChange={(open) => {
                  if (open) {
                    handleEditUser(usuario);
                  } else {
                    handleDialogClose();
                  }
                }}
                onSuccess={handleDialogClose}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
