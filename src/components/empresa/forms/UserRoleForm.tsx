
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AppRole } from '@/types/auth';

const userRoleSchema = z.object({
  roles: z.array(z.string()).min(0),
});

type UserRoleFormData = z.infer<typeof userRoleSchema>;

interface UserRoleFormProps {
  user: any;
  onSuccess: () => void;
}

const availableRoles: { value: AppRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
  { value: 'gestor', label: 'Gestor', description: 'Gestão de processos e equipes' },
  { value: 'colaborador', label: 'Colaborador', description: 'Acesso básico ao sistema' },
  { value: 'rh', label: 'RH', description: 'Gestão de recursos humanos' },
  { value: 'financeiro', label: 'Financeiro', description: 'Gestão financeira' },
];

export function UserRoleForm({ user, onSuccess }: UserRoleFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const currentRoles = user.user_roles?.map((ur: any) => ur.role) || [];

  const form = useForm<UserRoleFormData>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      roles: currentRoles,
    },
  });

  const updateUserRolesMutation = useMutation({
    mutationFn: async (data: UserRoleFormData) => {
      // Primeiro, remover todos os roles atuais
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id);
      
      if (deleteError) throw deleteError;

      // Depois, inserir os novos roles
      if (data.roles.length > 0) {
        const rolesToInsert = data.roles.map(role => ({
          user_id: user.id,
          role: role as AppRole,
        }));

        const { error: insertError } = await supabase
          .from('user_roles')
          .insert(rolesToInsert);
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios-sistema'] });
      toast({
        title: 'Sucesso',
        description: 'Roles do usuário atualizados com sucesso!',
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar roles do usuário.',
        variant: 'destructive',
      });
      console.error('Erro ao atualizar roles:', error);
    },
  });

  const onSubmit = (data: UserRoleFormData) => {
    updateUserRolesMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Roles Disponíveis</h4>
            <p className="text-xs text-muted-foreground">
              Selecione os roles que este usuário deve ter no sistema.
            </p>
          </div>

          <FormField
            control={form.control}
            name="roles"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {availableRoles.map((role) => (
                    <FormField
                      key={role.value}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, role.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== role.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium">
                                {role.label}
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                {role.description}
                              </p>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            type="submit" 
            disabled={updateUserRolesMutation.isPending}
          >
            {updateUserRolesMutation.isPending ? 'Salvando...' : 'Salvar Roles'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
