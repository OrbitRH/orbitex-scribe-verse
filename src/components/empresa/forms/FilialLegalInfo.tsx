
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FilialFormData } from '../hooks/useFilialForm';

interface FilialLegalInfoProps {
  form: UseFormReturn<FilialFormData>;
}

export function FilialLegalInfo({ form }: FilialLegalInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <Input {...field} placeholder="00.000.000/0000-00" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inscricao_estadual"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inscrição Estadual</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
