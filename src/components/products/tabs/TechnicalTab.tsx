
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormData';

interface TechnicalTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function TechnicalTab({ form }: TechnicalTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="ncm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NCM</FormLabel>
              <FormControl>
                <Input placeholder="00000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cfop_padrao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CFOP Padrão</FormLabel>
              <FormControl>
                <Input placeholder="0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="peso_bruto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Bruto (kg)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.001"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
              <FormLabel>Peso Líquido (kg)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.001"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
              <FormLabel>Comprimento (cm)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
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
              <FormLabel>Largura (cm)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="altura"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura (cm)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tempo_producao_horas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de Produção (horas)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
