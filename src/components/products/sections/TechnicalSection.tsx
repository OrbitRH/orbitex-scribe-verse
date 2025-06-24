
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '../types/ProductFormData';
import { Ruler, FileBarChart, Clock } from 'lucide-react';

interface TechnicalSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export default function TechnicalSection({ form }: TechnicalSectionProps) {
  return (
    <div className="space-y-6">
      {/* Classificação Fiscal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileBarChart className="h-4 w-4" />
            Classificação Fiscal
          </CardTitle>
          <CardDescription>
            Códigos fiscais necessários para emissão de notas fiscais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ncm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">NCM</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="00000000" 
                      {...field} 
                      className="h-9"
                      maxLength={8}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Nomenclatura Comum do Mercosul (8 dígitos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cfop_padrao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">CFOP Padrão</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="0000" 
                      {...field} 
                      className="h-9"
                      maxLength={4}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Código Fiscal de Operações e Prestações
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Medidas e Peso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Ruler className="h-4 w-4" />
            Dimensões e Peso
          </CardTitle>
          <CardDescription>
            Especificações físicas do produto para cálculos de frete e estoque
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="peso_bruto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Peso Bruto (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.001"
                      placeholder="0.000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peso_liquido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Peso Líquido (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.001"
                      placeholder="0.000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comprimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Comprimento (cm)</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="largura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Largura (cm)</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem className="max-w-[200px]">
                <FormLabel className="text-sm font-medium">Altura (cm)</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Produção */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            Dados de Produção
          </CardTitle>
          <CardDescription>
            Informações para planejamento e controle de produção
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tempo_producao_horas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Tempo de Produção (horas)</FormLabel>
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
                    Tempo médio necessário para produzir uma unidade
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="perda_tecnica_percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Perda Técnica (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Percentual de perda esperada no processo produtivo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
