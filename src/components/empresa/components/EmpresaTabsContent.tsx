
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DadosGeraisTab } from '../tabs/DadosGeraisTab';
import { ComprasTab } from '../tabs/ComprasTab';
import { VendasTab } from '../tabs/VendasTab';
import { PedidosOrdemTab } from '../tabs/PedidosOrdemTab';
import { ProdutosRelacionadosTab } from '../tabs/ProdutosRelacionadosTab';
import { NotaFiscalCompra, NotaFiscalVenda, Order } from '../hooks/useEmpresaHistory';

interface EmpresaTabsContentProps {
  empresa: any;
  notasFiscaisCompra: NotaFiscalCompra[];
  notasFiscaisVenda: NotaFiscalVenda[];
  orders: Order[];
  relatedProducts: any[];
  loading: boolean;
}

export function EmpresaTabsContent({
  empresa,
  notasFiscaisCompra,
  notasFiscaisVenda,
  orders,
  relatedProducts,
  loading
}: EmpresaTabsContentProps) {
  const showCompras = empresa.tipo_empresa === 'fornecedor' || empresa.tipo_empresa === 'ambos';
  const showVendas = empresa.tipo_empresa === 'cliente' || empresa.tipo_empresa === 'ambos';

  return (
    <div className="flex-1 overflow-hidden">
      <TabsContent value="dados-gerais" className="h-full m-0">
        <ScrollArea className="h-full">
          <DadosGeraisTab empresa={empresa} />
        </ScrollArea>
      </TabsContent>

      {showCompras && (
        <TabsContent value="compras" className="h-full m-0">
          <ComprasTab 
            notasFiscais={notasFiscaisCompra}
            orders={orders}
            loading={loading}
          />
        </TabsContent>
      )}

      {showVendas && (
        <TabsContent value="vendas" className="h-full m-0">
          <VendasTab 
            notasFiscais={notasFiscaisVenda}
            orders={orders}
            loading={loading}
          />
        </TabsContent>
      )}

      <TabsContent value="pedidos" className="h-full m-0">
        <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 h-full">
          <ScrollArea className="h-full">
            <PedidosOrdemTab 
              orders={orders}
              loading={loading}
            />
          </ScrollArea>
        </div>
      </TabsContent>

      <TabsContent value="produtos" className="h-full m-0">
        <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 h-full">
          <ScrollArea className="h-full">
            <ProdutosRelacionadosTab 
              products={relatedProducts}
              loading={loading}
            />
          </ScrollArea>
        </div>
      </TabsContent>
    </div>
  );
}
