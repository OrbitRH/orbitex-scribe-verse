
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
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { PedidoCompra, StatusPedidoCompra } from '@/types/compras';
import { PedidoCompraFormModal } from '@/components/compras/PedidoCompraFormModal';

export default function PedidosCompra() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusPedidoCompra | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<PedidoCompra | null>(null);

  const { data: pedidos, isLoading, refetch } = useQuery({
    queryKey: ['pedidos-compra', searchTerm, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('pedidos_compra')
        .select(`
          *,
          empresa_fornecedor:empresas(id, razao_social, nome_fantasia, cnpj_cpf),
          itens:pedidos_compra_itens(
            id,
            quantidade,
            preco_unitario,
            valor_total,
            produto:produtos(codigo_interno, nome_comercial)
          )
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`numero_pedido.ilike.%${searchTerm}%,observacoes.ilike.%${searchTerm}%`);
      }

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PedidoCompra[];
    }
  });

  const getStatusColor = (status: StatusPedidoCompra) => {
    const colors = {
      'rascunho': 'bg-gray-100 text-gray-800',
      'pendente_aprovacao': 'bg-yellow-100 text-yellow-800',
      'aprovado': 'bg-green-100 text-green-800',
      'enviado': 'bg-blue-100 text-blue-800',
      'recebido_parcial': 'bg-orange-100 text-orange-800',
      'recebido_total': 'bg-emerald-100 text-emerald-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: StatusPedidoCompra) => {
    switch (status) {
      case 'aprovado':
      case 'recebido_total':
        return <CheckCircle className="w-4 h-4" />;
      case 'pendente_aprovacao':
      case 'enviado':
        return <Clock className="w-4 h-4" />;
      case 'cancelado':
        return <X className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleEdit = (pedido: PedidoCompra) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setSelectedPedido(null);
    setIsModalOpen(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Pedidos de Compra</h1>
          <p className="text-gray-600">Gerencie todos os pedidos de compra</p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Pedido
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
                  placeholder="Buscar por número do pedido ou observações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusPedidoCompra | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="rascunho">Rascunho</option>
                <option value="pendente_aprovacao">Pendente Aprovação</option>
                <option value="aprovado">Aprovado</option>
                <option value="enviado">Enviado</option>
                <option value="recebido_parcial">Recebido Parcial</option>
                <option value="recebido_total">Recebido Total</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {pedidos?.map((pedido) => (
          <Card key={pedido.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{pedido.numero_pedido}</h3>
                    <Badge className={`${getStatusColor(pedido.status)} flex items-center gap-1`}>
                      {getStatusIcon(pedido.status)}
                      {pedido.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Fornecedor:</p>
                      <p>{pedido.empresa_fornecedor?.razao_social || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Data do Pedido:</p>
                      <p>{new Date(pedido.data_pedido).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="font-medium">Valor Total:</p>
                      <p className="text-lg font-bold text-green-600">
                        R$ {pedido.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {pedido.data_entrega_prevista && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Entrega Prevista:</span> {new Date(pedido.data_entrega_prevista).toLocaleDateString('pt-BR')}
                    </div>
                  )}

                  {pedido.itens && pedido.itens.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">Itens: ({pedido.itens.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {pedido.itens.slice(0, 3).map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {item.produto?.nome_comercial || 'Produto não identificado'}
                          </span>
                        ))}
                        {pedido.itens.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded">
                            +{pedido.itens.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(pedido)}
                  >
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

        {(!pedidos || pedidos.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Comece criando seu primeiro pedido de compra.'
                }
              </p>
              {!searchTerm && !statusFilter && (
                <Button onClick={handleNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Pedido
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal do Formulário */}
      <PedidoCompraFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPedido(null);
        }}
        pedido={selectedPedido}
        onSuccess={() => {
          refetch();
          setIsModalOpen(false);
          setSelectedPedido(null);
        }}
      />
    </div>
  );
}
