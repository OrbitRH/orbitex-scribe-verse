
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useEmpresaConfig } from '../hooks/useEmpresaConfig';
import { EmpresaBasicInfo } from '../forms/EmpresaBasicInfo';
import { EmpresaAddressInfo } from '../forms/EmpresaAddressInfo';
import { EmpresaFiscalInfo } from '../forms/EmpresaFiscalInfo';

export function DadosEmpresaTab() {
  const { form, onSubmit, isLoading, isSaving } = useEmpresaConfig();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent>
              <EmpresaBasicInfo form={form} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <EmpresaAddressInfo form={form} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Fiscais</CardTitle>
          </CardHeader>
          <CardContent>
            <EmpresaFiscalInfo form={form} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
