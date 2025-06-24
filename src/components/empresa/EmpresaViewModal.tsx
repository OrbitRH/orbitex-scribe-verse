
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs } from '@/components/ui/tabs';
import { useEmpresaHistory } from './hooks/useEmpresaHistory';
import { EmpresaModalHeader } from './components/EmpresaModalHeader';
import { EmpresaTabsNavigation } from './components/EmpresaTabsNavigation';
import { EmpresaTabsContent } from './components/EmpresaTabsContent';

interface EmpresaViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  empresa: any;
}

export function EmpresaViewModal({ isOpen, onClose, onEdit, empresa }: EmpresaViewModalProps) {
  const { notasFiscaisCompra, notasFiscaisVenda, orders, relatedProducts, loading } = useEmpresaHistory(
    empresa?.id || '',
    empresa?.tipo_empresa || 'ambos'
  );

  if (!empresa) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[85vh] flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/20">
        <EmpresaModalHeader empresa={empresa} onEdit={onEdit} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="dados-gerais" className="flex-1 flex flex-col">
            <EmpresaTabsNavigation empresa={empresa} />
            <EmpresaTabsContent
              empresa={empresa}
              notasFiscaisCompra={notasFiscaisCompra}
              notasFiscaisVenda={notasFiscaisVenda}
              orders={orders}
              relatedProducts={relatedProducts}
              loading={loading}
            />
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
