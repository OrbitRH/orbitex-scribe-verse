import { useState, useEffect } from 'react';

export interface ItemNotaFiscal {
  id: string;
  produto_codigo: string;
  produto_nome: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  ncm: string;
  cfop: string;
  unidade: string;
}

export interface NotaFiscalCompra {
  id: string;
  numero: string;
  serie: string;
  data_emissao: string;
  valor_total: number;
  status: 'emitida' | 'cancelada' | 'autorizada' | 'rejeitada';
  chave_acesso: string;
  cfop: string;
  itens: ItemNotaFiscal[];
  observacoes?: string;
  fornecedor: string;
}

export interface NotaFiscalVenda {
  id: string;
  numero: string;
  serie: string;
  data_emissao: string;
  valor_total: number;
  status: 'emitida' | 'cancelada' | 'autorizada' | 'rejeitada';
  chave_acesso: string;
  cfop: string;
  itens: ItemNotaFiscal[];
  observacoes?: string;
  cliente: string;
}

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
  status: 'concluido' | 'pendente' | 'enviado' | 'cancelado';
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
  const [notasFiscaisCompra, setNotasFiscaisCompra] = useState<NotaFiscalCompra[]>([]);
  const [notasFiscaisVenda, setNotasFiscaisVenda] = useState<NotaFiscalVenda[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!empresaId) return;

    const loadMockData = () => {
      setLoading(true);
      
      // Mock data for Notas Fiscais de Compra
      if (tipo === 'fornecedor' || tipo === 'ambos') {
        setNotasFiscaisCompra([
          {
            id: '1',
            numero: '000001234',
            serie: '001',
            data_emissao: '2024-06-20',
            valor_total: 2020.00,
            status: 'autorizada',
            chave_acesso: '35240614200166000196550010000012341123456789',
            cfop: '1102',
            fornecedor: 'Fornecedor ABC Ltda',
            observacoes: 'Primeira compra do mês',
            itens: [
              {
                id: '1',
                produto_codigo: 'TEC001',
                produto_nome: 'Tecido Algodão 100%',
                quantidade: 50,
                valor_unitario: 25.50,
                valor_total: 1275.00,
                ncm: '52081200',
                cfop: '1102',
                unidade: 'MT'
              },
              {
                id: '2',
                produto_codigo: 'LIN001',
                produto_nome: 'Linha de Costura Premium',
                quantidade: 100,
                valor_unitario: 3.20,
                valor_total: 320.00,
                ncm: '54011010',
                cfop: '1102',
                unidade: 'UN'
              },
              {
                id: '3',
                produto_codigo: 'BOT001',
                produto_nome: 'Botões Metálicos 15mm',
                quantidade: 500,
                valor_unitario: 0.85,
                valor_total: 425.00,
                ncm: '96062100',
                cfop: '1102',
                unidade: 'UN'
              }
            ]
          },
          {
            id: '2',
            numero: '000001235',
            serie: '001',
            data_emissao: '2024-06-15',
            valor_total: 1850.00,
            status: 'autorizada',
            chave_acesso: '35240614200166000196550010000012351123456790',
            cfop: '1102',
            fornecedor: 'Fornecedor XYZ S.A.',
            itens: [
              {
                id: '4',
                produto_codigo: 'ZIP001',
                produto_nome: 'Zíper Metálico 20cm',
                quantidade: 200,
                valor_unitario: 4.50,
                valor_total: 900.00,
                ncm: '96072000',
                cfop: '1102',
                unidade: 'UN'
              },
              {
                id: '5',
                produto_codigo: 'ELA001',
                produto_nome: 'Elástico 2cm Branco',
                quantidade: 100,
                valor_unitario: 9.50,
                valor_total: 950.00,
                ncm: '56074990',
                cfop: '1102',
                unidade: 'MT'
              }
            ]
          },
          {
            id: '3',
            numero: '000001236',
            serie: '001',
            data_emissao: '2024-06-10',
            valor_total: 425.00,
            status: 'cancelada',
            chave_acesso: '35240614200166000196550010000012361123456791',
            cfop: '1102',
            fornecedor: 'Fornecedor ABC Ltda',
            observacoes: 'NF cancelada por divergência',
            itens: [
              {
                id: '6',
                produto_codigo: 'BOT002',
                produto_nome: 'Botões Plásticos 12mm',
                quantidade: 1000,
                valor_unitario: 0.425,
                valor_total: 425.00,
                ncm: '96062100',
                cfop: '1102',
                unidade: 'UN'
              }
            ]
          }
        ]);
      }

      // Mock data for Notas Fiscais de Venda
      if (tipo === 'cliente' || tipo === 'ambos') {
        setNotasFiscaisVenda([
          {
            id: '1',
            numero: '000002001',
            serie: '001',
            data_emissao: '2024-06-22',
            valor_total: 4495.00,
            status: 'autorizada',
            chave_acesso: '35240614200166000196550010000020011234567890',
            cfop: '5102',
            cliente: 'Cliente Premium Ltda',
            itens: [
              {
                id: '1',
                produto_codigo: 'CAM001',
                produto_nome: 'Camisa Polo Masculina P',
                quantidade: 25,
                valor_unitario: 89.90,
                valor_total: 2247.50,
                ncm: '61051000',
                cfop: '5102',
                unidade: 'UN'
              },
              {
                id: '2',
                produto_codigo: 'CAM002',
                produto_nome: 'Camisa Polo Masculina M',
                quantidade: 25,
                valor_unitario: 89.90,
                valor_total: 2247.50,
                ncm: '61051000',
                cfop: '5102',
                unidade: 'UN'
              }
            ]
          },
          {
            id: '2',
            numero: '000002002',
            serie: '001',
            data_emissao: '2024-06-18',
            valor_total: 3247.00,
            status: 'autorizada',
            chave_acesso: '35240614200166000196550010000020021234567891',
            cfop: '5102',
            cliente: 'Loja Fashion Store',
            itens: [
              {
                id: '3',
                produto_codigo: 'CAL001',
                produto_nome: 'Calça Jeans Feminina 38',
                quantidade: 15,
                valor_unitario: 129.90,
                valor_total: 1948.50,
                ncm: '62034200',
                cfop: '5102',
                unidade: 'UN'
              },
              {
                id: '4',
                produto_codigo: 'VES001',
                produto_nome: 'Vestido Social P',
                quantidade: 8,
                valor_unitario: 162.31,
                valor_total: 1298.50,
                ncm: '62044200',
                cfop: '5102',
                unidade: 'UN'
              }
            ]
          },
          {
            id: '3',
            numero: '000002003',
            serie: '001',
            data_emissao: '2024-06-12',
            valor_total: 1599.20,
            status: 'emitida',
            chave_acesso: '35240614200166000196550010000020031234567892',
            cfop: '5102',
            cliente: 'Boutique Elegante',
            observacoes: 'Aguardando coleta',
            itens: [
              {
                id: '5',
                produto_codigo: 'VES002',
                produto_nome: 'Vestido Social M',
                quantidade: 8,
                valor_unitario: 199.90,
                valor_total: 1599.20,
                ncm: '62044200',
                cfop: '5102',
                unidade: 'UN'
              }
            ]
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
    notasFiscaisCompra,
    notasFiscaisVenda,
    orders,
    relatedProducts,
    loading
  };
}
