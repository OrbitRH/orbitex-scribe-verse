
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { FilialFormData } from '../hooks/useFilialForm';

interface FilialSettingsProps {
  form: UseFormReturn<FilialFormData>;
  filial?: any;
}

export function FilialSettings({ form, filial }: FilialSettingsProps) {
  return (
    <div className="flex gap-6">
      <FormField
        control={form.control}
        name="matriz"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Matriz</FormLabel>
              <FormDescription>
                Esta filial é a matriz da empresa
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={filial?.matriz}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ativo"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Ativo</FormLabel>
              <FormDescription>
                Filial está ativa no sistema
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
    </div>
  );
}
