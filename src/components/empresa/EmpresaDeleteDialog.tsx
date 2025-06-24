
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EmpresaDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  empresa: any;
  loading?: boolean;
}

export function EmpresaDeleteDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  empresa, 
  loading = false 
}: EmpresaDeleteDialogProps) {
  if (!empresa) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inativar Empresa</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <p>
                Tem certeza que deseja inativar a empresa <strong>{empresa.razao_social}</strong>?
              </p>
              <p className="text-sm text-muted-foreground">
                Esta ação não pode ser desfeita. A empresa será marcada como inativa 
                mas seus dados serão preservados no sistema.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Inativando...' : 'Inativar Empresa'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
