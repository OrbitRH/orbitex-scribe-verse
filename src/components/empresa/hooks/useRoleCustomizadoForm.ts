
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const roleSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  cor: z.string().default('#6B7280'),
  ativo: z.boolean().default(true),
  permissoes: z.array(z.string()).min(0),
});

export type RoleFormData = z.infer<typeof roleSchema>;

interface UseRoleCustomizadoFormProps {
  role?: any;
  onSuccess: () => void;
}

export function useRoleCustomizadoForm({ role, onSuccess }: UseRoleCustomizadoFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const currentPermissoes = role?.roles_permissoes?.map((rp: any) => rp.permissao_id) || [];

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: role ? {
      nome: role.nome || '',
      descricao: role.descricao || '',
      cor: role.cor || '#6B7280',
      ativo: role.ativo !== undefined ? role.ativo : true,
      permissoes: currentPermissoes,
    } : {
      nome: '',
      descricao: '',
      cor: '#6B7280',
      ativo: true,
      permissoes: [],
    },
  });

  const saveRoleMutation = useMutation({
    mutationFn: async (data: RoleFormData) => {
      const roleData = {
        nome: data.nome,
        descricao: data.descricao,
        cor: data.cor,
        ativo: data.ativo,
      };

      let roleId = role?.id;

      if (role?.id) {
        // Atualizar role existente
        const { error } = await supabase
          .from('roles_customizados')
          .update(roleData)
          .eq('id', role.id);
        if (error) throw error;
      } else {
        // Criar novo role
        const { data: newRole, error } = await supabase
          .from('roles_customizados')
          .insert([roleData])
          .select('id')
          .single();
        if (error) throw error;
        roleId = newRole.id;
      }

      // Remover permissões existentes
      const { error: deleteError } = await supabase
        .from('roles_permissoes')
        .delete()
        .eq('role_id', roleId);
      
      if (deleteError) throw deleteError;

      // Adicionar novas permissões
      if (data.permissoes.length > 0) {
        const permissoesToInsert = data.permissoes.map(permissaoId => ({
          role_id: roleId,
          permissao_id: permissaoId,
        }));

        const { error: insertError } = await supabase
          .from('roles_permissoes')
          .insert(permissoesToInsert);
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles-customizados'] });
      toast({
        title: 'Sucesso',
        description: `Role ${role ? 'atualizado' : 'criado'} com sucesso!`,
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: `Erro ao ${role ? 'atualizar' : 'criar'} role.`,
        variant: 'destructive',
      });
      console.error('Erro ao salvar role:', error);
    },
  });

  const onSubmit = (data: RoleFormData) => {
    saveRoleMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isSaving: saveRoleMutation.isPending,
    isEditing: !!role,
  };
}
