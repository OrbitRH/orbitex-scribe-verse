
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleFormData } from '../hooks/useRoleCustomizadoForm';

interface RolePermissionsSectionProps {
  form: UseFormReturn<RoleFormData>;
  permissoes: any[];
}

export function RolePermissionsSection({ form, permissoes }: RolePermissionsSectionProps) {
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
  );
}
