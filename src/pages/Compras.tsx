import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  CheckCircle,
  AlertTriangle,
  List,
  Kanban,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardComprasData, TarefaCompra } from '@/types/compras';

export default function Compras() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-compras'],
    queryFn: async (): Promise<DashboardComprasData> => {
      // Buscar dados do dashboard
      const [
        pedidosResult, 
        cotacoesResult, 
        fornecedoresResult,
        tarefasResult
      ] = await Promise.all([
        supabase.from('pedidos_compra').select('*').eq('status', 'pendente_aprovacao'),
        supabase.from('cotacoes').select('*').eq('status', 'pendente'),
        supabase.from('empresas').select('*').eq('ativo', true).in('tipo_empresa', ['fornecedor', 'ambos']),
        supabase.from('tarefas_compras').select('*')
      ]);

      const tarefasPendentes = tarefasResult.data?.filter(t => t.status === 'pendente').length || 0;
      const tarefasEmAndamento = tarefasResult.data?.filter(t => t.status === 'em_andamento').length || 0;
      const tarefasAtrasadas = tarefasResult.data?.filter(t => 
        t.prazo_limite && new Date(t.prazo_limite) < new Date() && t.status !== 'concluida'
      ).length || 0;

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

      const tarefasRecentes = await supabase
        .from('tarefas_compras')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      return {
        tarefas_pendentes: tarefasPendentes,
        tarefas_em_andamento: tarefasEmAndamento,
        tarefas_atrasadas: tarefasAtrasadas,
        pedidos_pendentes: pedidosResult.data?.length || 0,
        cotacoes_abertas: cotacoesResult.data?.length || 0,
        valor_mes_atual: 0, // Calcular valor do mês atual
        fornecedores_ativos: fornecedoresResult.data?.length || 0,
        valor_total_mes: 0, // Calcular valor do mês atual
        pedidos_recentes: pedidosRecentes.data || [],
        cotacoes_vencendo: cotacoesVencendo.data || [],
        tarefas_recentes: tarefasRecentes.data || []
      };
    }
  });

  const { data: tarefas, isLoading: isLoadingTarefas } = useQuery({
    queryKey: ['tarefas-compras'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tarefas_compras')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'urgente': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Workflow de Compras</h1>
          <p className="text-muted-foreground">Gerencie todo o processo de compras de forma integrada</p>
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

      {/* Métricas do Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {dashboardData?.tarefas_pendentes || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dashboardData?.tarefas_em_andamento || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Atrasadas</p>
                <p className="text-2xl font-bold text-red-600">
                  {dashboardData?.tarefas_atrasadas || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor do Mês</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {(dashboardData?.valor_mes_atual || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Tarefas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tarefas do Workflow</CardTitle>
              <CardDescription>Visualize e gerencie todas as tarefas do processo de compras</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                Lista
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <Kanban className="w-4 h-4 mr-2" />
                Kanban
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {isLoadingTarefas ? (
                <div className="text-center py-8">Carregando tarefas...</div>
              ) : tarefas && tarefas.length > 0 ? (
                tarefas.map((tarefa) => (
                  <div key={tarefa.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{tarefa.numero_tarefa}</p>
                        <p className="text-sm text-muted-foreground">{tarefa.titulo}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tarefa.status)}`}>
                          {tarefa.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPrioridadeColor(tarefa.prioridade)}`}>
                          {tarefa.prioridade}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{tarefa.tipo_tarefa}</p>
                      <p className="text-xs text-muted-foreground">
                        Não atribuído
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma tarefa encontrada
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Visualização Kanban será implementada em breve
            </div>
          )}
        </CardContent>
      </Card>

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
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{pedido.numero_pedido}</p>
                    <p className="text-sm text-muted-foreground">
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
                <p className="text-muted-foreground text-center py-4">Nenhum pedido encontrado</p>
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
                    <p className="text-sm text-muted-foreground">{cotacao.titulo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      Vence em: {new Date(cotacao.data_limite_resposta).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
              {(!dashboardData?.cotacoes_vencendo || dashboardData.cotacoes_vencendo.length === 0) && (
                <p className="text-muted-foreground text-center py-4">Nenhuma cotação vencendo</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}