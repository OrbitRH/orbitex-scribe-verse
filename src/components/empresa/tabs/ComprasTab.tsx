
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, TrendingUp, FileText, ShoppingBag, Maximize2, Minimize2 } from 'lucide-react';
import { NotaFiscalCompra, Order } from '../hooks/useEmpresaHistory';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { NotaFiscalRow } from '../components/NotaFiscalRow';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import { useTableExpansion } from '../hooks/useTableExpansion';
import { ModernCard } from '../components/ModernCard';

interface ComprasTabProps {
  notasFiscais: NotaFiscalCompra[];
  orders: Order[];
  loading: boolean;
}

export function ComprasTab({ notasFiscais, orders, loading }: ComprasTabProps) {
  const { filters, setFilters, clearFilters, filterNotasFiscais } = useAdvancedFilters();
  const { isExpanded, toggleExpansion, expandAll, collapseAll } = useTableExpansion();
  const [activeTab, setActiveTab] = useState('notas-fiscais');

  const filteredNotasFiscais = filterNotasFiscais(notasFiscais);
  const pedidosCompra = orders.filter(order => order.tipo === 'compra');
  
  const totalCompras = filteredNotasFiscais.reduce((sum, nf) => sum + nf.valor_total, 0);
  const totalItens = filteredNotasFiscais.reduce((sum, nf) => sum + nf.itens.length, 0);
  const totalPedidos = pedidosCompra.reduce((sum, order) => sum + order.valor_total, 0);

  if (loading) {
    return (
      <div className="h-full flex flex-col space-y-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="flex-1" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pendente: 'secondary',
      producao: 'default',
      enviado: 'outline',
      entregue: 'default',
      cancelado: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
        <ModernCard className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total de Compras</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalCompras)}
            </div>
            <p className="text-xs text-blue-700">
              {filteredNotasFiscais.length} notas fiscais
            </p>
          </CardContent>
        </ModernCard>

        <ModernCard className="bg-gradient-to-br from-green-50/50 to-green-100/30 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Pedidos de Compra</CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalPedidos)}
            </div>
            <p className="text-xs text-green-700">
              {pedidosCompra.length} pedidos
            </p>
          </CardContent>
        </ModernCard>

        <ModernCard className="bg-gradient-to-br from-purple-50/50 to-purple-100/30 border-purple-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Total de Itens</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {totalItens}
            </div>
            <p className="text-xs text-purple-700">
              Produtos comprados
            </p>
          </CardContent>
        </ModernCard>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="notas-fiscais" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notas Fiscais
          </TabsTrigger>
          <TabsTrigger value="pedidos" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Pedidos de Compra
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notas-fiscais" className="flex-1 flex flex-col space-y-4 mt-6">
          {/* Filters */}
          <div className="flex-shrink-0">
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              resultCount={filteredNotasFiscais.length}
            />
          </div>

          {/* Table */}
          <ModernCard className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notas Fiscais de Compra
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => expandAll(filteredNotasFiscais.map(nf => nf.id))}
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Expandir Tudo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={collapseAll}
                  >
                    <Minimize2 className="h-4 w-4 mr-2" />
                    Recolher Tudo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="p-6 pt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-48">Nota Fiscal</TableHead>
                        <TableHead className="w-32">Data</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead className="w-20">CFOP</TableHead>
                        <TableHead className="w-32 text-right">Valor Total</TableHead>
                        <TableHead className="w-24">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotasFiscais.map((notaFiscal) => (
                        <NotaFiscalRow
                          key={notaFiscal.id}
                          notaFiscal={notaFiscal}
                          isExpanded={isExpanded(notaFiscal.id)}
                          onToggleExpand={() => toggleExpansion(notaFiscal.id)}
                          tipo="compra"
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </ModernCard>
        </TabsContent>

        <TabsContent value="pedidos" className="flex-1 flex flex-col space-y-4 mt-6">
          <ModernCard className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Pedidos de Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Itens</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedidosCompra.map((order) => (
                      <TableRow key={order.id}>
                        <td className="font-medium">{order.numero}</td>
                        <td>{new Date(order.data).toLocaleDateString('pt-BR')}</td>
                        <td>{order.itens} itens</td>
                        <td className="text-right">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(order.valor_total)}
                        </td>
                        <td>{getStatusBadge(order.status)}</td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </ModernCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
