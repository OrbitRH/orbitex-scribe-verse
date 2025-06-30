
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
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Fornecedor {
  id: string;
  razao_social: string;
  nome_fantasia?: string;
  cnpj_cpf?: string;
  telefone?: string;
  email?: string;
  cidade?: string;
  estado?: string;
  ativo: boolean;
  created_at: string;
  // Dados calculados
  total_pedidos?: number;
  valor_total_compras?: number;
  ultimo_pedido?: string;
}

export default function Fornecedores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativo' | 'inativo'>('todos');

  const { data: fornecedores, isLoading } = useQuery({
    queryKey: ['fornecedores', searchTerm, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('empresas')
        .select('*')
        .in('tipo_empresa', ['fornecedor', 'ambos'])
        .order('razao_social');

      if (searchTerm) {
        query = query.or(`razao_social.ilike.%${searchTerm}%,nome_fantasia.ilike.%${searchTerm}%,cnpj_cpf.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== 'todos') {
        query = query.eq('ativo', statusFilter === 'ativo');
      }

      const { data, error } = await query;
      if (error) throw error;

      // Buscar estatísticas de compras para cada fornecedor
      const fornecedoresComStats = await Promise.all(
        (data || []).map(async (fornecedor) => {
          const { data: pedidos } = await supabase
            .from('pedidos_compra')
            .select('valor_total, created_at')
            .eq('empresa_fornecedor_id', fornecedor.id);

          const totalPedidos = pedidos?.length || 0;
          const valorTotalCompras = pedidos?.reduce((sum, p) => sum + (p.valor_total || 0), 0) || 0;
          const ultimoPedido = pedidos?.[0]?.created_at;

          return {
            ...fornecedor,
            total_pedidos: totalPedidos,
            valor_total_compras: valorTotalCompras,
            ultimo_pedido: ultimoPedido
          } as Fornecedor;
        })
      );

      return fornecedoresComStats;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600">Gerencie sua base de fornecedores</p>
        </div>
        <Button asChild>
          <Link to="/cadastros/empresas?tipo=fornecedor">
            <Plus className="w-4 h-4 mr-2" />
            Novo Fornecedor
          </Link>
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Fornecedores</p>
                <p className="text-2xl font-bold text-blue-600">
                  {fornecedores?.length || 0}
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
                <p className="text-sm font-medium text-gray-600">Fornecedores Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {fornecedores?.filter(f => f.ativo).length || 0}
                </p>
              </div>
              <Building className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total Compras</p>
                <p className="text-2xl font-bold text-purple-600">
                  R$ {(fornecedores?.reduce((sum, f) => sum + (f.valor_total_compras || 0), 0) || 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por razão social, nome fantasia ou CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'todos' | 'ativo' | 'inativo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fornecedores?.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {fornecedor.nome_fantasia || fornecedor.razao_social}
                  </h3>
                  {fornecedor.nome_fantasia && (
                    <p className="text-sm text-gray-600">{fornecedor.razao_social}</p>
                  )}
                </div>
                <Badge 
                  variant={fornecedor.ativo ? "default" : "secondary"}
                  className={fornecedor.ativo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {fornecedor.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {fornecedor.cnpj_cpf && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{fornecedor.cnpj_cpf}</span>
                  </div>
                )}
                
                {fornecedor.telefone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{fornecedor.telefone}</span>
                  </div>
                )}
                
                {fornecedor.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{fornecedor.email}</span>
                  </div>
                )}
                
                {(fornecedor.cidade || fornecedor.estado) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{[fornecedor.cidade, fornecedor.estado].filter(Boolean).join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Estatísticas de Compras */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Pedidos</p>
                    <p className="font-semibold">{fornecedor.total_pedidos || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Valor Total</p>
                    <p className="font-semibold text-green-600">
                      R$ {(fornecedor.valor_total_compras || 0).toLocaleString('pt-BR', { 
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                      })}
                    </p>
                  </div>
                </div>
                {fornecedor.ultimo_pedido && (
                  <div className="mt-2 text-xs text-gray-500">
                    Último pedido: {new Date(fornecedor.ultimo_pedido).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/compras/pedidos?fornecedor=${fornecedor.id}`}>
                    Ver Pedidos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!fornecedores || fornecedores.length === 0) && (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum fornecedor encontrado</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'todos'
                    ? 'Tente ajustar os filtros de busca.' 
                    : 'Comece cadastrando seu primeiro fornecedor.'
                  }
                </p>
                {!searchTerm && statusFilter === 'todos' && (
                  <Button asChild>
                    <Link to="/cadastros/empresas?tipo=fornecedor">
                      <Plus className="w-4 h-4 mr-2" />
                      Cadastrar Primeiro Fornecedor
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
