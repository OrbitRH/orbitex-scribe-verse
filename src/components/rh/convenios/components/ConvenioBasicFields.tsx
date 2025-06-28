
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ConvenioFormData, TipoConvenioType } from '../types/ConvenioTypes';

interface ConvenioBasicFieldsProps {
  register: UseFormRegister<ConvenioFormData>;
  watch: UseFormWatch<ConvenioFormData>;
  setValue: UseFormSetValue<ConvenioFormData>;
}

export function ConvenioBasicFields({ register, watch, setValue }: ConvenioBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome do Convênio *</Label>
          <Input
            id="nome"
            {...register('nome', { required: true })}
            placeholder="Nome do convênio"
          />
        </div>
        <div>
          <Label htmlFor="codigo">Código</Label>
          <Input
            id="codigo"
            {...register('codigo')}
            placeholder="Código identificador"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tipo">Tipo *</Label>
          <Select value={watch('tipo')} onValueChange={(value: TipoConvenioType) => setValue('tipo', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medico">Médico</SelectItem>
              <SelectItem value="odontologico">Odontológico</SelectItem>
              <SelectItem value="farmacia">Farmácia</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="ans_registro">Registro ANS</Label>
          <Input
            id="ans_registro"
            {...register('ans_registro')}
            placeholder="Número do registro ANS"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="empresa_convenio">Empresa Conveniada</Label>
        <Input
          id="empresa_convenio"
          {...register('empresa_convenio')}
          placeholder="Nome da empresa conveniada"
        />
      </div>
    </>
  );
}
