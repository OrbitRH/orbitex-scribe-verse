
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Package, Clock } from 'lucide-react';
import { Order } from '../hooks/useEmpresaHistory';

interface PedidosOrdemTabProps {
  orders: Order[];
  loading: boolean;
}

export function PedidosOrdemTab({ orders, loading }: PedidosOrdemTabProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      pendente: 'secondary',
      producao: 'outline',
      enviado: 'default',
      entregue: 'default',
      cancelado: 'destructive'
    } as const;

    const labels = {
      pendente: 'Pendente',
      producao: 'Em Produção',
      enviado: 'Enviado',
      entregue: 'Entregue',
      cancelado: 'Cancelado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTipoBadge = (tipo: string) => {
    return (
      <Badge variant={tipo === 'venda' ? 'default' : 'secondary'}>
        {tipo === 'venda' ? 'Venda' : 'Compra'}
      </Badge>
    );
  };

  const totalPedidos = orders.reduce((sum, order) => sum + order.valor_total, 0);
  const pedidosAbertos = orders.filter(order => 
    ['pendente', 'producao', 'enviado'].includes(order.status)
  ).length;

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

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum pedido encontrado
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Esta empresa ainda não possui pedidos ou ordens registrados.
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
            <CardTitle className="text-sm font-medium">Total em Pedidos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalPedidos)}
            </div>
            <p className="text-xs text-muted-foreground">
              {orders.length} pedidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Abertos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidosAbertos}</div>
            <p className="text-xs text-muted-foreground">
              Em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Itens Totais</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((sum, order) => sum + order.itens, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Produtos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos e Ordens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Itens</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.numero}
                    </TableCell>
                    <TableCell>
                      {new Date(order.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {getTipoBadge(order.tipo)}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.itens}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(order.valor_total)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
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
