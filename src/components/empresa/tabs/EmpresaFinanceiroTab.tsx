
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EmpresaFormData } from '../hooks/useEmpresaForm';

interface EmpresaFinanceiroTabProps {
  form: UseFormReturn<EmpresaFormData>;
}

export function EmpresaFinanceiroTab({ form }: EmpresaFinanceiroTabProps) {
  const tipoEmpresa = form.watch('tipo_empresa');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Condições Comerciais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="condicao_pagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condição de Pagamento Padrão</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="avista">À Vista</SelectItem>
                      <SelectItem value="7dias">7 dias</SelectItem>
                      <SelectItem value="14dias">14 dias</SelectItem>
                      <SelectItem value="30dias">30 dias</SelectItem>
                      <SelectItem value="60dias">60 dias</SelectItem>
                      <SelectItem value="90dias">90 dias</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moeda_operacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moeda de Operação</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dólar (US$)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {(tipoEmpresa === 'cliente' || tipoEmpresa === 'ambos') && (
            <FormField
              control={form.control}
              name="limite_credito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limite de Crédito (Clientes)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      step="0.01"
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      placeholder="0,00" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      {(tipoEmpresa === 'fornecedor' || tipoEmpresa === 'ambos') && (
        <Card>
          <CardHeader>
            <CardTitle>Dados Bancários (Fornecedores)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="banco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome do banco" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agência</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0000" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="conta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="00000-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Instruções Financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="instrucoes_financeiras"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instruções de Cobrança/Recebimento</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Instruções especiais para cobrança ou recebimento..."
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
