
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Building, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmpresasList } from '@/components/empresa/EmpresasList';
import { EmpresaFormModal } from '@/components/empresa/EmpresaFormModal';
import { EmpresaViewModal } from '@/components/empresa/EmpresaViewModal';
import { EmpresaDeleteDialog } from '@/components/empresa/EmpresaDeleteDialog';
import { useToast } from '@/hooks/use-toast';

export default function Empresas() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddEmpresa = () => {
    setSelectedEmpresa(null);
    setModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleViewEmpresa = (empresa: any) => {
    setSelectedEmpresa(empresa);
    setIsViewModalOpen(true);
  };

  const handleEditEmpresa = (empresa: any) => {
    setSelectedEmpresa(empresa);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleDeleteEmpresa = (empresa: any) => {
    setSelectedEmpresa(empresa);
    setIsDeleteDialogOpen(true);
  };

  const handleEditFromView = () => {
    setIsViewModalOpen(false);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Aqui você implementaria a lógica para inativar a empresa
      console.log('Inativando empresa:', selectedEmpresa?.id);
      
      toast({
        title: 'Empresa inativada',
        description: `${selectedEmpresa?.razao_social} foi inativada com sucesso.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedEmpresa(null);
    } catch (error) {
      console.error('Erro ao inativar empresa:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao inativar empresa. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    setSelectedEmpresa(null);
    // Aqui você atualizaria a lista de empresas
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedEmpresa(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
          <p className="text-gray-600">
            Gerencie clientes, fornecedores e parceiros comerciais.
          </p>
        </div>
        <Button onClick={handleAddEmpresa}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <Tabs defaultValue="lista" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lista">Lista de Empresas</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Lista de Empresas
              </CardTitle>
              <CardDescription>
                Visualize e gerencie todas as empresas cadastradas (clientes, fornecedores ou ambos).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por razão social, nome fantasia ou CNPJ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="cliente">Clientes</SelectItem>
                    <SelectItem value="fornecedor">Fornecedores</SelectItem>
                    <SelectItem value="ambos">Cliente e Fornecedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <EmpresasList 
                searchTerm={searchTerm} 
                filterType={filterType}
                onView={handleViewEmpresa}
                onEdit={handleEditEmpresa}
                onDelete={handleDeleteEmpresa}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Relatórios gerenciais sobre clientes e fornecedores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Relatórios em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Modal */}
      <EmpresaFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSuccess={handleFormSuccess}
        empresa={modalMode === 'edit' ? selectedEmpresa : undefined}
      />

      {/* View Modal */}
      <EmpresaViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModals}
        onEdit={handleEditFromView}
        empresa={selectedEmpresa}
      />

      {/* Delete Confirmation Dialog */}
      <EmpresaDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        empresa={selectedEmpresa}
        loading={loading}
      />
    </div>
  );
}
