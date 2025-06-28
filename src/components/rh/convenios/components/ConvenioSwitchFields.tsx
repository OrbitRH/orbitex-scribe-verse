
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ConvenioFormData } from '../types/ConvenioTypes';

interface ConvenioSwitchFieldsProps {
  watch: UseFormWatch<ConvenioFormData>;
  setValue: UseFormSetValue<ConvenioFormData>;
}

export function ConvenioSwitchFields({ watch, setValue }: ConvenioSwitchFieldsProps) {
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
          id="ativo"
          checked={watch('ativo')}
          onCheckedChange={(checked) => setValue('ativo', checked)}
        />
        <Label htmlFor="ativo">Ativo</Label>
      </div>
    </div>
  );
}
