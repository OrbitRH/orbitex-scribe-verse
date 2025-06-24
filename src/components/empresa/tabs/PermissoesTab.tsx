
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleCustomizadoForm } from '@/components/empresa/forms/RoleCustomizadoForm';
import { usePermissoesTab } from '@/components/empresa/hooks/usePermissoesTab';
import { RolesCustomizadosTable } from '@/components/empresa/components/RolesCustomizadosTable';
import { EmptyRolesState } from '@/components/empresa/components/EmptyRolesState';
import { PermissoesSistema } from '@/components/empresa/components/PermissoesSistema';

export function PermissoesTab() {
  const {
    permissoes,
    rolesCustomizados,
    loadingPermissoes,
    loadingRoles,
    selectedRole,
    isDialogOpen,
    permissoesPorModulo,
    handleEditRole,
    handleAddRole,
    handleDeleteRole,
    handleDialogClose,
  } = usePermissoesTab();

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
                <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
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
              {rolesCustomizados && rolesCustomizados.length > 0 ? (
                <RolesCustomizadosTable
                  rolesCustomizados={rolesCustomizados}
                  onEdit={handleEditRole}
                  onDelete={handleDeleteRole}
                />
              ) : (
                <EmptyRolesState onAddRole={handleAddRole} />
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
              <PermissoesSistema permissoesPorModulo={permissoesPorModulo} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
