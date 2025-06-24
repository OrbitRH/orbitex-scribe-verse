
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormData';

interface TechSheetTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function TechSheetTab({ form }: TechSheetTabProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="observacoes_tecnicas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações Técnicas</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Observações sobre processo produtivo, composição, etc."
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          A ficha técnica com componentes (BOM) poderá ser configurada após o cadastro do produto.
        </p>
      </div>
    </div>
  );
}
