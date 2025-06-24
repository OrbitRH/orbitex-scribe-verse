
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EmpresaFormData } from '../hooks/useEmpresaForm';

interface EmpresaFiscalTabProps {
  form: UseFormReturn<EmpresaFormData>;
}

export function EmpresaFiscalTab({ form }: EmpresaFiscalTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Fiscais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="contribuinte_icms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Contribuinte de ICMS
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque se a empresa é contribuinte do ICMS
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="codigo_ibge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código IBGE da Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0000000" />
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
                    <Input {...field} placeholder="0.000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="responsavel_frete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável pelo Frete</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CIF">CIF - Remetente (Vendedor)</SelectItem>
                    <SelectItem value="FOB">FOB - Destinatário (Comprador)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações Fiscais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Importante</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Inscrição Estadual "Isento" impacta na emissão de NF-e</li>
              <li>• O código IBGE é obrigatório para emissão de notas fiscais</li>
              <li>• O regime tributário afeta os cálculos fiscais</li>
              <li>• CFOP padrão será usado como sugestão nas vendas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
