
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { BeneficioFormData, CategoriaType } from '../types/BeneficioTypes';

interface BeneficioBasicFieldsProps {
  register: UseFormRegister<BeneficioFormData>;
  watch: UseFormWatch<BeneficioFormData>;
  setValue: UseFormSetValue<BeneficioFormData>;
}

export function BeneficioBasicFields({ register, watch, setValue }: BeneficioBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            {...register('nome', { required: true })}
            placeholder="Nome do benefício"
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
          <Label htmlFor="categoria">Categoria *</Label>
          <Select value={watch('categoria')} onValueChange={(value: CategoriaType) => setValue('categoria', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="alimentacao">Alimentação</SelectItem>
              <SelectItem value="transporte">Transporte</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="periodicidade">Periodicidade</Label>
          <Select value={watch('periodicidade')} onValueChange={(value) => setValue('periodicidade', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a periodicidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="quinzenal">Quinzenal</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          {...register('descricao')}
          placeholder="Descrição do benefício"
        />
      </div>
    </>
  );
}
