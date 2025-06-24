
import { useState, useMemo } from 'react';
import { NotaFiscalCompra, NotaFiscalVenda } from './useEmpresaHistory';

export interface FilterState {
  searchText: string;
  startDate?: Date;
  endDate?: Date;
  status: string[];
  minValue?: number;
  maxValue?: number;
  cfop?: string;
}

const initialFilters: FilterState = {
  searchText: '',
  status: [],
};

export function useAdvancedFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filterNotasFiscais = <T extends NotaFiscalCompra | NotaFiscalVenda>(
    notasFiscais: T[]
  ): T[] => {
    return useMemo(() => {
      return notasFiscais.filter(nf => {
        // Filtro por texto
        if (filters.searchText) {
          const searchLower = filters.searchText.toLowerCase();
          const matchesSearch = 
            nf.numero.toLowerCase().includes(searchLower) ||
            nf.itens.some(item => 
              item.produto_nome.toLowerCase().includes(searchLower) ||
              item.produto_codigo.toLowerCase().includes(searchLower)
            ) ||
            ('fornecedor' in nf && nf.fornecedor.toLowerCase().includes(searchLower)) ||
            ('cliente' in nf && nf.cliente.toLowerCase().includes(searchLower));
          
          if (!matchesSearch) return false;
        }

        // Filtro por data inicial
        if (filters.startDate) {
          const nfDate = new Date(nf.data_emissao);
          if (nfDate < filters.startDate) return false;
        }

        // Filtro por data final
        if (filters.endDate) {
          const nfDate = new Date(nf.data_emissao);
          if (nfDate > filters.endDate) return false;
        }

        // Filtro por status
        if (filters.status.length > 0) {
          if (!filters.status.includes(nf.status)) return false;
        }

        // Filtro por valor mínimo
        if (filters.minValue !== undefined) {
          if (nf.valor_total < filters.minValue) return false;
        }

        // Filtro por valor máximo
        if (filters.maxValue !== undefined) {
          if (nf.valor_total > filters.maxValue) return false;
        }

        // Filtro por CFOP
        if (filters.cfop) {
          if (nf.cfop !== filters.cfop) return false;
        }

        return true;
      });
    }, [notasFiscais, filters]);
  };

  return {
    filters,
    setFilters,
    clearFilters,
    filterNotasFiscais
  };
}
