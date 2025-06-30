
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  Clock,
  CheckCircle,
  X,
  AlertTriangle
} from 'lucide-react';
import { Cotacao, StatusCotacao } from '@/types/compras';

export default function Cotacoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusCotacao | ''>('');

  const { data: cotacoes, isLoading } = useQuery({
    queryKey: ['cotacoes', searchTerm, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('cotacoes')
        .select(`
          *,
          itens:cotacoes_itens(
            id,
            quantidade,
            produto:produtos(codigo_interno, nome_comercial)
          ),
          fornecedores:cotacoes_fornecedores(
            id,
            status,
            valor_total,
            empresa_fornecedor:empresas(razao_social)
          )
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`numero_cotacao.ilike.%${searchTerm}%,titulo.ilike.%${searchTerm}%,descricao.ilike.%${searchTerm}%`);
      }

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Cotacao[];
    }
  });

  const getStatusColor = (status: StatusCotacao) => {
    const colors = {
      'pendente': 'bg-yellow-100 text-yellow-800',
      'respondida': 'bg-blue-100 text-blue-800',
      'aceita': 'bg-green-100 text-green-800',
      'rejeitada': 'bg-red-100 text-red-800',
      'expirada': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: StatusCotacao) => {
    switch (status) {
      case 'aceita':
        return <CheckCircle className="w-4 h-4" />;
      case 'pendente':
        return <Clock className="w-4 h-4" />;
      case 'rejeitada':
        return <X className="w-4 h-4" />;
      case 'expirada':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const isVencendo = (dataLimite: string) => {
    const limite = new Date(dataLimite);
    const hoje = new Date();
    const diffDias = Math.ceil((limite.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    return diffDias <= 3 && diffDias >= 0;
  };

  const isVencida = (dataLimite: string) => {
    return new Date(dataLimite) < new Date();
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Cotações</h1>
          <p className="text-gray-600">Gerencie cotações de preços com fornecedores</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Cotação
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por número, título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusCotacao | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="respondida">Respondida</option>
                <option value="aceita">Aceita</option>
                <option value="rejeitada">Rejeitada</option>
                <option value="expirada">Expirada</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Cotações */}
      <div className="space-y-4">
        {cotacoes?.map((cotacao) => (
          <Card 
            key={cotacao.id} 
            className={`hover:shadow-md transition-shadow ${
              isVencida(cotacao.data_limite_resposta) && cotacao.status === 'pendente' 
                ? 'border-red-200 bg-red-50' 
                : isVencendo(cotacao.data_limite_resposta) && cotacao.status === 'pendente'
                ? 'border-yellow-200 bg-yellow-50'
                : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{cotacao.numero_cotacao}</h3>
                    <Badge className={`${getStatusColor(cotacao.status)} flex items-center gap-1`}>
                      {getStatusIcon(cotacao.status)}
                      {cotacao.status}
                    </Badge>
                    
                    {isVencida(cotacao.data_limite_resposta) && cotacao.status === 'pendente' && (
                      <Badge variant="destructive">Vencida</Badge>
                    )}
                    
                    {isVencendo(cotacao.data_limite_resposta) && cotacao.status === 'pendente' && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Vencendo
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{cotacao.titulo}</h4>
                  
                  {cotacao.descricao && (
                    <p className="text-gray-600 mb-3">{cotacao.descricao}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Data de Solicitação:</p>
                      <p>{new Date(cotacao.data_solicitacao).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="font-medium">Prazo Limite:</p>
                      <p className={
                        isVencida(cotacao.data_limite_resposta) && cotacao.status === 'pendente'
                          ? 'text-red-600 font-medium'
                          : isVencendo(cotacao.data_limite_resposta) && cotacao.status === 'pendente'
                          ? 'text-yellow-600 font-medium'
                          : ''
                      }>
                        {new Date(cotacao.data_limite_resposta).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Fornecedores:</p>
                      <p>{cotacao.fornecedores?.length || 0} convidados</p>
                    </div>
                  </div>

                  {cotacao.itens && cotacao.itens.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">Itens: ({cotacao.itens.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {cotacao.itens.slice(0, 3).map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {item.produto?.nome_comercial || 'Produto não identificado'}
                          </span>
                        ))}
                        {cotacao.itens.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded">
                            +{cotacao.itens.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Respostas dos fornecedores */}
                  {cotacao.fornecedores && cotacao.fornecedores.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-600 mb-2">Respostas dos Fornecedores:</p>
                      <div className="space-y-1">
                        {cotacao.fornecedores.map((fornecedor, index) => (
                          <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                            <span>{fornecedor.empresa_fornecedor?.razao_social}</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                size="sm" 
                                className={getStatusColor(fornecedor.status)}
                              >
                                {fornecedor.status}
                              </Badge>
                              {fornecedor.valor_total && (
                                <span className="font-medium">
                                  R$ {fornecedor.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!cotacoes || cotacoes.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma cotação encontrada</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Comece criando sua primeira cotação de preços.'
                }
              </p>
              {!searchTerm && !statusFilter && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Cotação
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
