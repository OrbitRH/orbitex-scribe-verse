
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';
import { ConvenioFormData } from '../types/ConvenioTypes';

interface ConvenioContactFieldsProps {
  register: UseFormRegister<ConvenioFormData>;
}

export function ConvenioContactFields({ register }: ConvenioContactFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contato">Contato Responsável</Label>
          <Input
            id="contato"
            {...register('contato')}
            placeholder="Nome do responsável"
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            {...register('telefone')}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="contato@convenio.com"
          />
        </div>
        <div>
          <Label htmlFor="site">Site</Label>
          <Input
            id="site"
            {...register('site')}
            placeholder="www.convenio.com"
          />
        </div>
      </div>
    </>
  );
}
