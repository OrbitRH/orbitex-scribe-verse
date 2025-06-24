
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const roleSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  cor: z.string().default('#6B7280'),
  ativo: z.boolean().default(true),
  permissoes: z.array(z.string()).min(0),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleCustomizadoFormProps {
  role?: any;
  permissoes: any[];
  onSuccess: () => void;
}

export function RoleCustomizadoForm({ role, permissoes, onSuccess }: RoleCustomizadoFormProps) {
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

  // Agrupar permissões por módulo com verificação de tipo
  const permissoesPorModulo = Array.isArray(permissoes) ? permissoes.reduce((acc, permissao) => {
    const modulo = permissao.modulo;
    if (!acc[modulo]) {
      acc[modulo] = [];
    }
    acc[modulo].push(permissao);
    return acc;
  }, {} as Record<string, any[]>) : {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Role</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Supervisor de Vendas" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <Input {...field} type="color" className="w-full h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Descreva as responsabilidades deste role..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ativo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Role Ativo</FormLabel>
                <FormDescription>
                  Este role está disponível para atribuição aos usuários
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div>
            <FormLabel>Permissões</FormLabel>
            <FormDescription>
              Selecione as permissões que este role deve ter.
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="permissoes"
            render={() => (
              <FormItem>
                <div className="space-y-4">
                  {Object.entries(permissoesPorModulo).map(([modulo, perms]) => (
                    <Card key={modulo}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium capitalize">
                          {modulo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Array.isArray(perms) && perms.map((permissao) => (
                            <FormField
                              key={permissao.id}
                              control={form.control}
                              name="permissoes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={permissao.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(permissao.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, permissao.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== permissao.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-sm font-medium">
                                        {permissao.nome}
                                      </FormLabel>
                                      <p className="text-xs text-muted-foreground">
                                        {permissao.descricao}
                                      </p>
                                    </div>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={saveRoleMutation.isPending}>
            {saveRoleMutation.isPending ? 'Salvando...' : role ? 'Atualizar' : 'Criar'} Role
          </Button>
        </div>
      </form>
    </Form>
  );
}
