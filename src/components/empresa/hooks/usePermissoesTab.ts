
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function usePermissoesTab() {
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

  return {
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
  };
}
