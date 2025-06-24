
import React from 'react';
import { VendasTab } from './VendasTab';
import { NotaFiscalVenda } from '../hooks/useEmpresaHistory';

interface HistoricoVendasTabProps {
  notasFiscais: NotaFiscalVenda[];
  loading: boolean;
}

export function HistoricoVendasTab({ notasFiscais, loading }: HistoricoVendasTabProps) {
  return (
    <VendasTab 
      notasFiscais={notasFiscais}
      orders={[]}
      loading={loading}
    />
  );
}
