
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useBeneficioForm } from './hooks/useBeneficioForm';
import { BeneficioBasicFields } from './components/BeneficioBasicFields';
import { BeneficioValueFields } from './components/BeneficioValueFields';
import { BeneficioSwitchFields } from './components/BeneficioSwitchFields';
import { BeneficioFormModalProps } from './types/BeneficioTypes';

export function BeneficioFormModal({ isOpen, onClose, beneficio, onSuccess }: BeneficioFormModalProps) {
  const { handleSubmit, register, watch, setValue, resetForm, formState: { isSubmitting } } = useBeneficioForm(beneficio, onSuccess);

  React.useEffect(() => {
    if (isOpen) {
      resetForm(beneficio);
    }
  }, [isOpen, beneficio, resetForm]);

  const onSubmit = handleSubmit((data) => {
    // The actual submission logic is handled in the hook
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {beneficio ? 'Editar Benefício' : 'Novo Benefício'}
          </DialogTitle>
          <DialogDescription>
            {beneficio ? 'Edite as informações do benefício' : 'Cadastre um novo tipo de benefício'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <BeneficioBasicFields
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <BeneficioValueFields
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <BeneficioSwitchFields
            watch={watch}
            setValue={setValue}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : beneficio ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
