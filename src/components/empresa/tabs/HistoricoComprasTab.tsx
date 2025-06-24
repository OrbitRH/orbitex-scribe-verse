
import React from 'react';
import { ComprasTab } from './ComprasTab';
import { NotaFiscalCompra } from '../hooks/useEmpresaHistory';

interface HistoricoComprasTabProps {
  notasFiscais: NotaFiscalCompra[];
  loading: boolean;
}

export function HistoricoComprasTab({ notasFiscais, loading }: HistoricoComprasTabProps) {
  return (
    <ComprasTab 
      notasFiscais={notasFiscais}
      orders={[]}
      loading={loading}
    />
  );
}
