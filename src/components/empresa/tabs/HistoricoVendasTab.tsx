
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingBag, TrendingUp, Calendar, Maximize2, Minimize2 } from 'lucide-react';
import { NotaFiscalVenda } from '../hooks/useEmpresaHistory';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { NotaFiscalRow } from '../components/NotaFiscalRow';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import { useTableExpansion } from '../hooks/useTableExpansion';

interface HistoricoVendasTabProps {
  notasFiscais: NotaFiscalVenda[];
  loading: boolean;
}

export function HistoricoVendasTab({ notasFiscais, loading }: HistoricoVendasTabProps) {
  const { filters, setFilters, clearFilters, filterNotasFiscais } = useAdvancedFilters();
  const { isExpanded, toggleExpansion, expandAll, collapseAll } = useTableExpansion();

  const filteredNotasFiscais = filterNotasFiscais(notasFiscais);
  const totalVendas = filteredNotasFiscais.reduce((sum, nf) => sum + nf.valor_total, 0);
  const totalItens = filteredNotasFiscais.reduce((sum, nf) => sum + nf.itens.length, 0);

  if (loading) {
    return (
      <div className="h-full flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="flex-1" />
      </div>
    );
  }

  if (notasFiscais.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Nenhuma venda encontrada
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Esta empresa ainda não possui histórico de vendas registrado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900">Total de Vendas</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalVendas)}
            </div>
            <p className="text-xs text-emerald-700">
              {filteredNotasFiscais.length} notas fiscais
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Ticket Médio</CardTitle>
            <ShoppingBag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {filteredNotasFiscais.length > 0 ? new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalVendas / filteredNotasFiscais.length) : 'R$ 0,00'}
            </div>
            <p className="text-xs text-orange-700">
              Por nota fiscal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-rose-100/50 border-rose-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rose-900">Total de Itens</CardTitle>
            <Calendar className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-900">
              {totalItens}
            </div>
            <p className="text-xs text-rose-700">
              Produtos vendidos
            </p>
          </CardContent>
        </Card>
      </div>

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
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Vendas</CardTitle>
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
                    <TableHead>Cliente</TableHead>
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
                      tipo="venda"
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
