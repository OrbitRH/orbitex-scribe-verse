
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit, User, ShoppingCart, ShoppingBag, Package, FileText } from 'lucide-react';
import { useEmpresaHistory } from './hooks/useEmpresaHistory';
import { DadosGeraisTab } from './tabs/DadosGeraisTab';
import { ComprasTab } from './tabs/ComprasTab';
import { VendasTab } from './tabs/VendasTab';
import { PedidosOrdemTab } from './tabs/PedidosOrdemTab';
import { ProdutosRelacionadosTab } from './tabs/ProdutosRelacionadosTab';

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

  const getTipoEmpresaBadge = (tipo: string) => {
    const variants = {
      cliente: 'default',
      fornecedor: 'secondary',
      ambos: 'outline'
    } as const;

    const labels = {
      cliente: 'Cliente',
      fornecedor: 'Fornecedor',
      ambos: 'Cliente/Fornecedor'
    };

    return (
      <Badge variant={variants[tipo as keyof typeof variants]}>
        {labels[tipo as keyof typeof labels]}
      </Badge>
    );
  };

  const getSituacaoBadge = (situacao: string) => {
    return (
      <Badge variant={situacao === 'ativo' ? 'default' : 'destructive'}>
        {situacao === 'ativo' ? 'Ativo' : 'Inativo'}
      </Badge>
    );
  };

  // Determine which tabs to show based on company type
  const showCompras = empresa.tipo_empresa === 'fornecedor' || empresa.tipo_empresa === 'ambos';
  const showVendas = empresa.tipo_empresa === 'cliente' || empresa.tipo_empresa === 'ambos';

  const tabsCount = 3 + (showCompras ? 1 : 0) + (showVendas ? 1 : 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[85vh] flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/20">
        <DialogHeader className="flex-shrink-0 pb-4 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-3 text-slate-800">
                {empresa.razao_social}
                {getTipoEmpresaBadge(empresa.tipo_empresa)}
                {getSituacaoBadge(empresa.situacao)}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {empresa.nome_fantasia && `${empresa.nome_fantasia} • `}
                {empresa.cnpj}
              </DialogDescription>
            </div>
            <Button onClick={onEdit} size="sm" className="bg-slate-700 hover:bg-slate-800">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="dados-gerais" className="flex-1 flex flex-col">
            <TabsList className={`flex-shrink-0 grid w-full grid-cols-${tabsCount} mb-4 bg-white/50 backdrop-blur-sm border border-slate-200/50`}>
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
                <User className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              {showCompras && (
                <TabsTrigger value="compras" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
                  <ShoppingCart className="h-4 w-4" />
                  Compras
                </TabsTrigger>
              )}
              {showVendas && (
                <TabsTrigger value="vendas" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
                  <ShoppingBag className="h-4 w-4" />
                  Vendas
                </TabsTrigger>
              )}
              <TabsTrigger value="pedidos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
                <FileText className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="produtos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
            </TabsList>

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
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
