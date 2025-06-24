
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRoleCustomizadoForm } from '../hooks/useRoleCustomizadoForm';
import { RoleBasicFields } from './RoleBasicFields';
import { RolePermissionsSection } from './RolePermissionsSection';

interface RoleCustomizadoFormProps {
  role?: any;
  permissoes: any[];
  onSuccess: () => void;
}

export function RoleCustomizadoForm({ role, permissoes, onSuccess }: RoleCustomizadoFormProps) {
  const { form, onSubmit, isSaving, isEditing } = useRoleCustomizadoForm({ role, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RoleBasicFields form={form} />
        
        <RolePermissionsSection form={form} permissoes={permissoes} />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'} Role
          </Button>
        </div>
      </form>
    </Form>
  );
}
