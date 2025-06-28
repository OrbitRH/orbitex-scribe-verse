
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ConvenioFormModalProps } from './types/ConvenioTypes';
import { ConvenioBasicFields } from './components/ConvenioBasicFields';
import { ConvenioContactFields } from './components/ConvenioContactFields';
import { ConvenioSwitchFields } from './components/ConvenioSwitchFields';
import { useConvenioForm } from './hooks/useConvenioForm';

export function ConvenioFormModal({ isOpen, onClose, convenio, onSuccess }: ConvenioFormModalProps) {
  const { register, watch, setValue, reset, onSubmit, formState: { isSubmitting } } = useConvenioForm(convenio, onSuccess);

  React.useEffect(() => {
    if (isOpen) {
      reset({
        nome: convenio?.nome || '',
        codigo: convenio?.codigo || '',
        tipo: (convenio?.tipo as any) || 'medico',
        empresa_convenio: convenio?.empresa_convenio || '',
        descricao: convenio?.descricao || '',
        ans_registro: convenio?.ans_registro || '',
        permite_dependentes: convenio?.permite_dependentes || false,
        contato: convenio?.contato || '',
        telefone: convenio?.telefone || '',
        email: convenio?.email || '',
        site: convenio?.site || '',
        ativo: convenio?.ativo ?? true,
      });
    }
  }, [isOpen, convenio, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {convenio ? 'Editar Convênio' : 'Novo Convênio'}
          </DialogTitle>
          <DialogDescription>
            {convenio ? 'Edite as informações do convênio' : 'Cadastre um novo convênio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <ConvenioBasicFields register={register} watch={watch} setValue={setValue} />

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              {...register('descricao')}
              placeholder="Descrição do convênio"
            />
          </div>

          <ConvenioContactFields register={register} />

          <ConvenioSwitchFields watch={watch} setValue={setValue} />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : convenio ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
