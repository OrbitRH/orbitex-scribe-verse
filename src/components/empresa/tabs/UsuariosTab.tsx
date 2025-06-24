
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserRoleForm } from '@/components/empresa/forms/UserRoleForm';

export function UsuariosTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: usuarios, isLoading } = useQuery({
    queryKey: ['usuarios-sistema'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (
            role,
            assigned_at
          )
        `)
        .order('full_name');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: roles } = useQuery({
    queryKey: ['user-roles-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .order('role');
      
      if (error) throw error;
      
      // Criar lista única de roles
      const uniqueRoles = [...new Set(data.map(r => r.role))];
      return uniqueRoles;
    },
  });

  const deleteUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios-sistema'] });
      toast({
        title: 'Sucesso',
        description: 'Role removido com sucesso!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao remover role.',
        variant: 'destructive',
      });
      console.error('Erro ao remover role:', error);
    },
  });

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleRemoveRole = (userId: string, role: string) => {
    if (confirm(`Tem certeza que deseja remover o role "${role}" deste usuário?`)) {
      deleteUserRoleMutation.mutate({ userId, role });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-800',
      gestor: 'bg-blue-100 text-blue-800',
      colaborador: 'bg-green-100 text-green-800',
      rh: 'bg-purple-100 text-purple-800',
      financeiro: 'bg-yellow-100 text-yellow-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

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
              {usuarios?.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">
                    {usuario.full_name}
                  </TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {usuario.user_roles?.map((userRole: any, index: number) => (
                        <Badge
                          key={index}
                          className={getRoleColor(userRole.role)}
                          variant="secondary"
                        >
                          {userRole.role}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 hover:bg-red-200"
                            onClick={() => handleRemoveRole(usuario.id, userRole.role)}
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                      {(!usuario.user_roles || usuario.user_roles.length === 0) && (
                        <Badge variant="outline">Sem roles</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(usuario.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={isDialogOpen && selectedUser?.id === usuario.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(usuario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gerenciar Roles - {usuario.full_name}</DialogTitle>
                        </DialogHeader>
                        <UserRoleForm
                          user={usuario}
                          onSuccess={handleDialogClose}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {(!usuarios || usuarios.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum usuário encontrado</h3>
              <p className="text-muted-foreground text-center">
                Os usuários aparecerão aqui quando se cadastrarem no sistema.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
