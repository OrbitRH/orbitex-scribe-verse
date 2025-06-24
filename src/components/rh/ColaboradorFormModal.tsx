
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ColaboradorForm } from './ColaboradorForm';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColaboradorFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  colaborador?: any;
  onSuccess: () => void;
}

export function ColaboradorFormModal({ isOpen, onOpenChange, colaborador, onSuccess }: ColaboradorFormModalProps) {
  const handleSubmit = async (data: any) => {
    try {
      console.log('Dados do colaborador para salvar:', data);
      // Aqui implementaríamos a lógica de salvamento
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar colaborador:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {colaborador ? 'Editar Colaborador' : 'Novo Colaborador'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-auto h-full">
          <ColaboradorForm
            colaborador={colaborador}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
