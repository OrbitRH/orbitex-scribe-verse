
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '../types/ProductFormData';
import { Package, Calendar, Grid3x3 } from 'lucide-react';

interface StockSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export default function StockSection({ form }: StockSectionProps) {
  const controleEstoqueOptions = [
    { 
      value: 'padrao', 
      label: 'Padrão', 
      description: 'Controle simples de entrada e saída' 
    },
    { 
      value: 'grade', 
      label: 'Por Grade', 
      description: 'Controle separado por tamanho e cor' 
    },
    { 
      value: 'lote', 
      label: 'Por Lote', 
      description: 'Controle com rastreabilidade de lotes' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tipo de Controle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Controle de Estoque
          </CardTitle>
          <CardDescription>
            Configure como o estoque deste produto será controlado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="controle_estoque"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Tipo de Controle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione o tipo de controle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {controleEstoqueOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Define como as movimentações de estoque serão registradas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="controla_lote"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-medium">
                      Controle por Lote
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Ativa o controle de lotes para rastreabilidade
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

            <FormField
              control={form.control}
              name="controla_grade"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-medium">
                      Controle por Grade
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Ativa o controle por tamanhos e cores
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
        </CardContent>
      </Card>

      {/* Validade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Controle de Validade
          </CardTitle>
          <CardDescription>
            Configure regras de validade para o produto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="validade_dias"
            render={({ field }) => (
              <FormItem className="max-w-[200px]">
                <FormLabel className="text-sm font-medium">Validade (dias)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                    className="h-9"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Número de dias até o vencimento. Deixe em branco se não vence.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
