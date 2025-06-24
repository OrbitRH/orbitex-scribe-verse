
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { PurchaseHistory } from '../hooks/useEmpresaHistory';

interface HistoricoComprasTabProps {
  purchases: PurchaseHistory[];
  loading: boolean;
}

export function HistoricoComprasTab({ purchases, loading }: HistoricoComprasTabProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      concluido: 'default',
      pendente: 'secondary',
      cancelado: 'destructive'
    } as const;

    const labels = {
      concluido: 'Concluído',
      pendente: 'Pendente',
      cancelado: 'Cancelado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const totalCompras = purchases.reduce((sum, purchase) => sum + purchase.valor_total, 0);

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

  if (purchases.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhuma compra encontrada
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Esta empresa ainda não possui histórico de compras registrado.
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
            <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalCompras)}
            </div>
            <p className="text-xs text-muted-foreground">
              {purchases.length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalCompras / purchases.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Por transação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(purchases[0]?.data).toLocaleDateString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              {purchases[0]?.produto}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Compras</CardTitle>
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
                {purchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      {new Date(purchase.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {purchase.produto}
                    </TableCell>
                    <TableCell className="text-right">
                      {purchase.quantidade}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(purchase.valor_unitario)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(purchase.valor_total)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(purchase.status)}
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
