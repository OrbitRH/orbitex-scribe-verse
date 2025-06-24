
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilialForm } from '@/components/empresa/forms/FilialForm';

export function FiliaisTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFilial, setSelectedFilial] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: filiais, isLoading } = useQuery({
    queryKey: ['filiais'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('filiais')
        .select('*')
        .order('matriz', { ascending: false })
        .order('nome');
      
      if (error) throw error;
      return data;
    },
  });

  const deleteFilialMutation = useMutation({
    mutationFn: async (filialId: string) => {
      const { error } = await supabase
        .from('filiais')
        .delete()
        .eq('id', filialId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filiais'] });
      toast({
        title: 'Sucesso',
        description: 'Filial excluída com sucesso!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir filial.',
        variant: 'destructive',
      });
      console.error('Erro ao excluir filial:', error);
    },
  });

  const handleEdit = (filial: any) => {
    setSelectedFilial(filial);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedFilial(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (filialId: string, isMatriz: boolean) => {
    if (isMatriz) {
      toast({
        title: 'Ação não permitida',
        description: 'A matriz não pode ser excluída.',
        variant: 'destructive',
      });
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta filial?')) {
      deleteFilialMutation.mutate(filialId);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedFilial(null);
  };

  if (isLoading) {
    return <div>Carregando filiais...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Filiais Cadastradas</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie as filiais e unidades da empresa.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Filial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedFilial ? 'Editar Filial' : 'Nova Filial'}
              </DialogTitle>
            </DialogHeader>
            <FilialForm
              filial={selectedFilial}
              onSuccess={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filiais?.map((filial) => (
          <Card key={filial.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{filial.nome}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(filial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(filial.id, filial.matriz)}
                    disabled={filial.matriz}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={filial.matriz ? 'default' : 'secondary'}>
                  {filial.matriz ? 'Matriz' : 'Filial'}
                </Badge>
                <Badge variant={filial.ativo ? 'outline' : 'destructive'}>
                  {filial.ativo ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Código:</strong> {filial.codigo}
                </div>
                {filial.cnpj && (
                  <div>
                    <strong>CNPJ:</strong> {filial.cnpj}
                  </div>
                )}
                {filial.cidade && filial.estado && (
                  <div>
                    <strong>Localização:</strong> {filial.cidade}/{filial.estado}
                  </div>
                )}
                {filial.telefone && (
                  <div>
                    <strong>Telefone:</strong> {filial.telefone}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!filiais || filiais.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma filial cadastrada</h3>
            <p className="text-muted-foreground text-center mb-4">
              Comece adicionando a primeira filial da empresa.
            </p>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Filial
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
