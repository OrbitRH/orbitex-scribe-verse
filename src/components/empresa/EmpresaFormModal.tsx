
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmpresaForm } from './EmpresaForm';

interface EmpresaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  empresa?: any;
}

export function EmpresaFormModal({ isOpen, onClose, onSuccess, empresa }: EmpresaFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {empresa ? 'Editar Empresa' : 'Nova Empresa'}
          </DialogTitle>
          <DialogDescription>
            {empresa 
              ? 'Atualize as informações da empresa cadastrada.'
              : 'Preencha as informações para cadastrar uma nova empresa no sistema.'
            }
          </DialogDescription>
        </DialogHeader>
        <EmpresaForm
          empresa={empresa}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
