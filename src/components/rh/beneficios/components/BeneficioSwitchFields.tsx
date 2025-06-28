
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { BeneficioFormData } from '../types/BeneficioTypes';

interface BeneficioSwitchFieldsProps {
  watch: UseFormWatch<BeneficioFormData>;
  setValue: UseFormSetValue<BeneficioFormData>;
}

export function BeneficioSwitchFields({ watch, setValue }: BeneficioSwitchFieldsProps) {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="permite_dependentes"
          checked={watch('permite_dependentes')}
          onCheckedChange={(checked) => setValue('permite_dependentes', checked)}
        />
        <Label htmlFor="permite_dependentes">Permite Dependentes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="obrigatorio"
          checked={watch('obrigatorio')}
          onCheckedChange={(checked) => setValue('obrigatorio', checked)}
        />
        <Label htmlFor="obrigatorio">Obrigatório</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="ativo"
          checked={watch('ativo')}
          onCheckedChange={(checked) => setValue('ativo', checked)}
        />
        <Label htmlFor="ativo">Ativo</Label>
      </div>
    </div>
  );
}
