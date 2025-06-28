
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { BeneficioFormData, TipoDescontoType } from '../types/BeneficioTypes';

interface BeneficioValueFieldsProps {
  register: UseFormRegister<BeneficioFormData>;
  watch: UseFormWatch<BeneficioFormData>;
  setValue: UseFormSetValue<BeneficioFormData>;
}

export function BeneficioValueFields({ register, watch, setValue }: BeneficioValueFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="valor_empresa">Valor Empresa (R$)</Label>
        <Input
          id="valor_empresa"
          type="number"
          step="0.01"
          {...register('valor_empresa')}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="valor_desconto">Valor Desconto</Label>
        <Input
          id="valor_desconto"
          type="number"
          step="0.01"
          {...register('valor_desconto')}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="tipo_desconto">Tipo de Desconto</Label>
        <Select value={watch('tipo_desconto')} onValueChange={(value: TipoDescontoType) => setValue('tipo_desconto', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="valor_fixo">Valor Fixo</SelectItem>
            <SelectItem value="percentual">Percentual</SelectItem>
            <SelectItem value="sem_desconto">Sem Desconto</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
