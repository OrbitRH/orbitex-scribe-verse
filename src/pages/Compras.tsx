import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  ShoppingCart, 
  FileText, 
  Truck, 
  Users, 
  Plus, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardComprasData } from '@/types/compras';

export default function Compras() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-compras'],
    queryFn: async (): Promise<DashboardComprasData> => {
      // Buscar dados do dashboard
      const [pedidosResult, cotacoesResult, fornecedoresResult] = await Promise.all([
        supabase.from('pedidos_compra').select('*').eq('status', 'pendente_aprovacao'),
        supabase.from('cotacoes').select('*').eq('status', 'pendente'),
        supabase.from('empresas').select('*').eq('ativo', true).in('tipo_empresa', ['fornecedor', 'ambos'])
      ]);

      const pedidosRecentes = await supabase
        .from('pedidos_compra')
        .select(`
          *,
          empresa_fornecedor:empresas(id, razao_social, nome_fantasia, cnpj_cpf)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      const cotacoesVencendo = await supabase
        .from('cotacoes')
        .select('*')
        .eq('status', 'pendente')
        .lte('data_limite_resposta', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('data_limite_resposta', { ascending: true })
        .limit(5);

      return {
        pedidos_pendentes: pedidosResult.data?.length || 0,
        valor_total_mes: 0, // Calcular valor do mês atual
        fornecedores_ativos: fornecedoresResult.data?.length || 0,
        cotacoes_abertas: cotacoesResult.data?.length || 0,
        pedidos_recentes: pedidosRecentes.data || [],
        cotacoes_vencendo: cotacoesVencendo.data || []
      };
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compras</h1>
          <p className="text-gray-600">Gerencie pedidos, cotações e fornecedores</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/compras/cotacoes">
              <Plus className="w-4 h-4 mr-2" />
              Nova Cotação
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/compras/pedidos">
              <Plus className="w-4 h-4 mr-2" />
              Novo Pedido
            </Link>
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dashboardData?.pedidos_pendentes || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor do Mês</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {(dashboardData?.valor_total_mes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fornecedores Ativos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dashboardData?.fornecedores_ativos || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cotações Abertas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {dashboardData?.cotacoes_abertas || 0}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/compras/pedidos">
            <ShoppingCart className="w-6 h-6 mb-2" />
            Pedidos de Compra
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/compras/cotacoes">
            <FileText className="w-6 h-6 mb-2" />
            Cotações
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/compras/recebimentos">
            <Truck className="w-6 h-6 mb-2" />
            Recebimentos
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/compras/fornecedores">
            <Users className="w-6 h-6 mb-2" />
            Fornecedores
          </Link>
        </Button>
      </div>

      {/* Listas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos de compra criados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData?.pedidos_recentes?.map((pedido) => (
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{pedido.numero_pedido}</p>
                    <p className="text-sm text-gray-600">
                      {pedido.empresa_fornecedor?.razao_social || 'Fornecedor não informado'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      R$ {pedido.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      pedido.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                      pedido.status === 'pendente_aprovacao' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {pedido.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
              {(!dashboardData?.pedidos_recentes || dashboardData.pedidos_recentes.length === 0) && (
                <p className="text-gray-500 text-center py-4">Nenhum pedido encontrado</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cotações Vencendo */}
        <Card>
          <CardHeader>
            <CardTitle>Cotações Vencendo</CardTitle>
            <CardDescription>Cotações com prazo próximo ao vencimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData?.cotacoes_vencendo?.map((cotacao) => (
                <div key={cotacao.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{cotacao.numero_cotacao}</p>
                    <p className="text-sm text-gray-600">{cotacao.titulo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      Vence em: {new Date(cotacao.data_limite_resposta).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
              {(!dashboardData?.cotacoes_vencendo || dashboardData.cotacoes_vencendo.length === 0) && (
                <p className="text-gray-500 text-center py-4">Nenhuma cotação vencendo</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
