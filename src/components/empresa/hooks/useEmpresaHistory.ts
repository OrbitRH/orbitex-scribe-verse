
import { useState, useEffect } from 'react';

export interface PurchaseHistory {
  id: string;
  data: string;
  produto: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  status: 'concluido' | 'pendente' | 'cancelado';
}

export interface SalesHistory {
  id: string;
  data: string;
  produto: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  status: 'concluido' | 'pendente' | 'cancelado';
}

export interface Order {
  id: string;
  numero: string;
  data: string;
  tipo: 'compra' | 'venda';
  valor_total: number;
  status: 'pendente' | 'producao' | 'enviado' | 'entregue' | 'cancelado';
  itens: number;
}

export interface RelatedProduct {
  id: string;
  nome: string;
  ultimo_preco: number;
  ultima_compra: string;
  total_transacoes: number;
  variacao_preco: number;
}

export function useEmpresaHistory(empresaId: string, tipo: 'cliente' | 'fornecedor' | 'ambos') {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [salesHistory, setSalesHistory] = useState<SalesHistory[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!empresaId) return;

    const loadMockData = () => {
      setLoading(true);
      
      // Mock data for purchases
      if (tipo === 'fornecedor' || tipo === 'ambos') {
        setPurchaseHistory([
          {
            id: '1',
            data: '2024-06-20',
            produto: 'Tecido Algodão 100%',
            quantidade: 50,
            valor_unitario: 25.50,
            valor_total: 1275.00,
            status: 'concluido'
          },
          {
            id: '2',
            data: '2024-06-15',
            produto: 'Linha de Costura',
            quantidade: 100,
            valor_unitario: 3.20,
            valor_total: 320.00,
            status: 'concluido'
          },
          {
            id: '3',
            data: '2024-06-10',
            produto: 'Botões Metálicos',
            quantidade: 500,
            valor_unitario: 0.85,
            valor_total: 425.00,
            status: 'pendente'
          }
        ]);
      }

      // Mock data for sales
      if (tipo === 'cliente' || tipo === 'ambos') {
        setSalesHistory([
          {
            id: '1',
            data: '2024-06-22',
            produto: 'Camisa Polo Masculina',
            quantidade: 25,
            valor_unitario: 89.90,
            valor_total: 2247.50,
            status: 'concluido'
          },
          {
            id: '2',
            data: '2024-06-18',
            produto: 'Calça Jeans Feminina',
            quantidade: 15,
            valor_unitario: 129.90,
            valor_total: 1948.50,
            status: 'concluido'
          },
          {
            id: '3',
            data: '2024-06-12',
            produto: 'Vestido Social',
            quantidade: 8,
            valor_unitario: 199.90,
            valor_total: 1599.20,
            status: 'enviado'
          }
        ]);
      }

      // Mock orders data
      setOrders([
        {
          id: '1',
          numero: 'PV-2024-001',
          data: '2024-06-24',
          tipo: 'venda',
          valor_total: 3450.00,
          status: 'pendente',
          itens: 5
        },
        {
          id: '2',
          numero: 'OC-2024-015',
          data: '2024-06-23',
          tipo: 'compra',
          valor_total: 2100.00,
          status: 'producao',
          itens: 8
        },
        {
          id: '3',
          numero: 'PV-2024-002',
          data: '2024-06-20',
          tipo: 'venda',
          valor_total: 1890.00,
          status: 'entregue',
          itens: 3
        }
      ]);

      // Mock related products
      setRelatedProducts([
        {
          id: '1',
          nome: 'Tecido Algodão 100%',
          ultimo_preco: 25.50,
          ultima_compra: '2024-06-20',
          total_transacoes: 12,
          variacao_preco: 5.2
        },
        {
          id: '2',
          nome: 'Linha de Costura Premium',
          ultimo_preco: 3.20,
          ultima_compra: '2024-06-15',
          total_transacoes: 8,
          variacao_preco: -2.1
        },
        {
          id: '3',
          nome: 'Botões Metálicos',
          ultimo_preco: 0.85,
          ultima_compra: '2024-06-10',
          total_transacoes: 6,
          variacao_preco: 0
        }
      ]);

      setLoading(false);
    };

    // Simulate API call delay
    setTimeout(loadMockData, 500);
  }, [empresaId, tipo]);

  return {
    purchaseHistory,
    salesHistory,
    orders,
    relatedProducts,
    loading
  };
}
