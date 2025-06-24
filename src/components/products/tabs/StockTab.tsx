
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormData';

interface StockTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function StockTab({ form }: StockTabProps) {
  const tiposControleEstoque = [
    { value: 'padrao', label: 'Padrão' },
    { value: 'grade', label: 'Por Grade' },
    { value: 'lote', label: 'Por Lote' },
  ];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="controle_estoque"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Controle de Estoque</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tiposControleEstoque.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="controla_grade"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Controla Grade</FormLabel>
                <FormDescription>
                  Produto tem variações de tamanho/cor
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="controla_lote"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Controla Lote</FormLabel>
                <FormDescription>
                  Produto requer controle por lote
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="validade_dias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validade (dias)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                />
              </FormControl>
              <FormDescription>
                Deixe em branco se não tem validade
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
              <FormLabel>Perda Técnica (%)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  max="100"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
