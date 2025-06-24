
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit } from 'lucide-react';
import { useEmpresaHistory } from './hooks/useEmpresaHistory';
import { HistoricoComprasTab } from './tabs/HistoricoComprasTab';
import { HistoricoVendasTab } from './tabs/HistoricoVendasTab';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-3">
                {empresa.razao_social}
                {getTipoEmpresaBadge(empresa.tipo_empresa)}
                {getSituacaoBadge(empresa.situacao)}
              </DialogTitle>
              <DialogDescription>
                {empresa.nome_fantasia && `${empresa.nome_fantasia} • `}
                {empresa.cnpj}
              </DialogDescription>
            </div>
            <Button onClick={onEdit} size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="identificacao" className="flex-1 flex flex-col">
            <TabsList className="flex-shrink-0 grid w-full grid-cols-7 lg:grid-cols-7 mb-4">
              <TabsTrigger value="identificacao">Identificação</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
              <TabsTrigger value="endereco">Endereço</TabsTrigger>
              {showCompras && <TabsTrigger value="compras">Compras</TabsTrigger>}
              {showVendas && <TabsTrigger value="vendas">Vendas</TabsTrigger>}
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="identificacao" className="h-full m-0">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações de Identificação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Razão Social</label>
                          <p className="text-sm">{empresa.razao_social}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Nome Fantasia</label>
                          <p className="text-sm">{empresa.nome_fantasia || '-'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">CNPJ</label>
                          <p className="text-sm font-mono">{empresa.cnpj}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Tipo</label>
                          <p className="text-sm">{getTipoEmpresaBadge(empresa.tipo_empresa)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="contato" className="h-full m-0">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações de Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">E-mail</label>
                          <p className="text-sm">{empresa.email || '-'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Telefone</label>
                          <p className="text-sm">{empresa.telefone || '-'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="endereco" className="h-full m-0">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Endereço</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Cidade</label>
                          <p className="text-sm">{empresa.cidade || '-'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Estado</label>
                          <p className="text-sm">{empresa.estado || '-'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>

              {showCompras && (
                <TabsContent value="compras" className="h-full m-0">
                  <HistoricoComprasTab 
                    notasFiscais={notasFiscaisCompra}
                    loading={loading}
                  />
                </TabsContent>
              )}

              {showVendas && (
                <TabsContent value="vendas" className="h-full m-0">
                  <HistoricoVendasTab 
                    notasFiscais={notasFiscaisVenda}
                    loading={loading}
                  />
                </TabsContent>
              )}

              <TabsContent value="pedidos" className="h-full m-0">
                <ScrollArea className="h-full">
                  <PedidosOrdemTab 
                    orders={orders}
                    loading={loading}
                  />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="produtos" className="h-full m-0">
                <ScrollArea className="h-full">
                  <ProdutosRelacionadosTab 
                    products={relatedProducts}
                    loading={loading}
                  />
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
