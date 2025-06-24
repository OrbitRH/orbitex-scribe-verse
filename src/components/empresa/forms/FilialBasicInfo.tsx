
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FilialFormData } from '../hooks/useFilialForm';

interface FilialBasicInfoProps {
  form: UseFormReturn<FilialFormData>;
}

export function FilialBasicInfo({ form }: FilialBasicInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="codigo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: FIL001" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nome da filial" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
