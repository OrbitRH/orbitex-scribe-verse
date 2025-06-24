
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '../types/ProductFormData';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';

interface CommercialSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export default function CommercialSection({ form }: CommercialSectionProps) {
  const precoCompra = form.watch('preco_medio_compra') || 0;
  const markup = form.watch('markup_padrao') || 0;
  const precoSugerido = precoCompra && markup ? precoCompra * (1 + markup / 100) : 0;

  return (
    <div className="space-y-6">
      {/* Custos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4" />
            Custos e Preços
          </CardTitle>
          <CardDescription>
            Configure os valores de custo e preços de venda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preco_medio_compra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preço Médio de Compra (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Custo médio de aquisição ou produção
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custo_transformacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Custo de Transformação (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Custo adicional de mão de obra e processos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preços de Venda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            Preços de Venda
          </CardTitle>
          <CardDescription>
            Defina os preços de venda e margens de lucro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="markup_padrao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Markup Padrão (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Percentual de margem sobre o custo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preco_sugerido_venda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preço Sugerido de Venda (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Preço final sugerido para vendas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Calculadora de Preços */}
          {precoCompra > 0 && markup > 0 && (
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Calculator className="h-4 w-4" />
                  Cálculo Automático
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Custo:</span>
                    <p className="font-semibold">R$ {precoCompra.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Markup:</span>
                    <p className="font-semibold">{markup}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preço Sugerido:</span>
                    <p className="font-semibold text-green-600">R$ {precoSugerido.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
