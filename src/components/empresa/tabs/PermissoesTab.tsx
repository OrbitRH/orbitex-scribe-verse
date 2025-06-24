
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleCustomizadoForm } from '@/components/empresa/forms/RoleCustomizadoForm';

export function PermissoesTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: permissoes, isLoading: loadingPermissoes } = useQuery({
    queryKey: ['permissoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('permissoes')
        .select('*')
        .order('modulo')
        .order('nome');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: rolesCustomizados, isLoading: loadingRoles } = useQuery({
    queryKey: ['roles-customizados'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roles_customizados')
        .select(`
          *,
          roles_permissoes (
            permissao_id,
            permissoes (
              nome,
              descricao,
              modulo
            )
          )
        `)
        .order('nome');
      
      if (error) throw error;
      return data;
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from('roles_customizados')
        .delete()
        .eq('id', roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles-customizados'] });
      toast({
        title: 'Sucesso',
        description: 'Role customizado excluído com sucesso!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir role customizado.',
        variant: 'destructive',
      });
      console.error('Erro ao excluir role:', error);
    },
  });

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Tem certeza que deseja excluir este role customizado?')) {
      deleteRoleMutation.mutate(roleId);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedRole(null);
  };

  // Agrupar permissões por módulo
  const permissoesPorModulo = permissoes?.reduce((acc, permissao) => {
    const modulo = permissao.modulo;
    if (!acc[modulo]) {
      acc[modulo] = [];
    }
    acc[modulo].push(permissao);
    return acc;
  }, {} as Record<string, any[]>) || {};

  if (loadingPermissoes || loadingRoles) {
    return <div>Carregando permissões...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles Customizados</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões do Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Roles Customizados
                  </CardTitle>
                  <CardDescription>
                    Crie e gerencie roles personalizados com permissões específicas.
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddRole}>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedRole ? 'Editar Role' : 'Novo Role Customizado'}
                      </DialogTitle>
                    </DialogHeader>
                    <RoleCustomizadoForm
                      role={selectedRole}
                      permissoes={permissoes || []}
                      onSuccess={handleDialogClose}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
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
                  {rolesCustomizados?.map((role) => (
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
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {(!rolesCustomizados || rolesCustomizados.length === 0) && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum role customizado</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Crie roles personalizados para atender às necessidades específicas da empresa.
                  </p>
                  <Button onClick={handleAddRole}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Role
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes">
          <Card>
            <CardHeader>
              <CardTitle>Permissões do Sistema</CardTitle>
              <CardDescription>
                Visualize todas as permissões disponíveis no sistema, organizadas por módulo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(permissoesPorModulo).map(([modulo, perms]) => (
                  <div key={modulo}>
                    <h4 className="text-lg font-semibold mb-3 capitalize">
                      Módulo: {modulo}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {perms.map((permissao) => (
                        <Card key={permissao.id} className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm">{permissao.nome}</h5>
                              <Badge variant="outline" className="text-xs">
                                {permissao.acao}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {permissao.descricao}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
