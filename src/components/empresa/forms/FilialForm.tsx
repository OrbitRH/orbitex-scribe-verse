
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useFilialForm } from '../hooks/useFilialForm';
import { FilialBasicInfo } from './FilialBasicInfo';
import { FilialLegalInfo } from './FilialLegalInfo';
import { FilialAddressInfo } from './FilialAddressInfo';
import { FilialContactInfo } from './FilialContactInfo';
import { FilialSettings } from './FilialSettings';

interface FilialFormProps {
  filial?: any;
  onSuccess: () => void;
}

export function FilialForm({ filial, onSuccess }: FilialFormProps) {
  const { form, onSubmit, saveFilialMutation } = useFilialForm({ filial, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FilialBasicInfo form={form} />
        <FilialLegalInfo form={form} />
        <FilialAddressInfo form={form} />
        <FilialContactInfo form={form} />
        <FilialSettings form={form} filial={filial} />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={saveFilialMutation.isPending}>
            {saveFilialMutation.isPending ? 'Salvando...' : filial ? 'Atualizar' : 'Criar'} Filial
          </Button>
        </div>
      </form>
    </Form>
  );
}
