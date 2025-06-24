
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, TrendingUp, Calendar } from 'lucide-react';
import { SalesHistory } from '../hooks/useEmpresaHistory';

interface HistoricoVendasTabProps {
  sales: SalesHistory[];
  loading: boolean;
}

export function HistoricoVendasTab({ sales, loading }: HistoricoVendasTabProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      concluido: 'default',
      pendente: 'secondary',
      enviado: 'outline',
      cancelado: 'destructive'
    } as const;

    const labels = {
      concluido: 'Concluído',
      pendente: 'Pendente',
      enviado: 'Enviado',
      cancelado: 'Cancelado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const totalVendas = sales.reduce((sum, sale) => sum + sale.valor_total, 0);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <Card>
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalVendas)}
            </div>
            <p className="text-xs text-muted-foreground">
              {sales.length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalVendas / sales.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Por transação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Venda</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(sales[0]?.data).toLocaleDateString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              {sales[0]?.produto}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {new Date(sale.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.produto}
                    </TableCell>
                    <TableCell className="text-right">
                      {sale.quantidade}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(sale.valor_unitario)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(sale.valor_total)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sale.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
