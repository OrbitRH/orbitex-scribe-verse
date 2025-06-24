
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AppRole } from '@/types/auth';

export function useUsuarios() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const deleteUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
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

  const handleRemoveRole = (userId: string, role: string) => {
    if (confirm(`Tem certeza que deseja remover o role "${role}" deste usuário?`)) {
      deleteUserRoleMutation.mutate({ userId, role: role as AppRole });
    }
  };

  return {
    usuarios,
    isLoading,
    handleRemoveRole,
  };
}
