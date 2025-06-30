
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
  Truck,
  Package,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Recebimento } from '@/types/compras';

export default function Recebimentos() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: recebimentos, isLoading } = useQuery({
    queryKey: ['recebimentos', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('recebimentos')
        .select(`
          *,
          pedido_compra:pedidos_compra(
            id,
            numero_pedido,
            empresa_fornecedor:empresas(razao_social, nome_fantasia)
          ),
          itens:recebimentos_itens(
            id,
            quantidade_recebida,
            quantidade_aprovada,
            quantidade_rejeitada,
            pedido_item:pedidos_compra_itens(
              quantidade,
              produto:produtos(codigo_interno, nome_comercial)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`numero_nota_fiscal.ilike.%${searchTerm}%,observacoes.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Recebimento[];
    }
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Recebimentos</h1>
          <p className="text-gray-600">Controle de recebimento de mercadorias</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Recebimento
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por número da nota fiscal ou observações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recebimentos */}
      <div className="space-y-4">
        {recebimentos?.map((recebimento) => {
          const totalItens = recebimento.itens?.length || 0;
          const itensComRejeicao = recebimento.itens?.filter(item => item.quantidade_rejeitada > 0).length || 0;
          const hasRejeicao = itensComRejeicao > 0;

          return (
            <Card key={recebimento.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Recebimento #{recebimento.id.substring(0, 8)}
                      </h3>
                      {hasRejeicao && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Com Rejeições
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Pedido de Compra:</p>
                        <p>{recebimento.pedido_compra?.numero_pedido || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Fornecedor:</p>
                        <p>{recebimento.pedido_compra?.empresa_fornecedor?.razao_social || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Data de Recebimento:</p>
                        <p>{new Date(recebimento.data_recebimento).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>

                    {recebimento.numero_nota_fiscal && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Nota Fiscal:</span> {recebimento.numero_nota_fiscal}
                        {recebimento.valor_nota_fiscal && (
                          <span className="ml-4">
                            <span className="font-medium">Valor:</span> R$ {recebimento.valor_nota_fiscal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    )}

                    {totalItens > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Itens Recebidos: ({totalItens})
                          {itensComRejeicao > 0 && (
                            <span className="text-red-600 ml-2">({itensComRejeicao} com rejeições)</span>
                          )}
                        </p>
                        <div className="space-y-1">
                          {recebimento.itens?.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                              <span>
                                {item.pedido_item?.produto?.nome_comercial || 'Produto não identificado'}
                              </span>
                              <div className="flex items-center gap-3">
                                <span>Rec: {item.quantidade_recebida}</span>
                                {item.quantidade_aprovada !== undefined && (
                                  <span className="text-green-600">Apr: {item.quantidade_aprovada}</span>
                                )}
                                {item.quantidade_rejeitada > 0 && (
                                  <span className="text-red-600">Rej: {item.quantidade_rejeitada}</span>
                                )}
                              </div>
                            </div>
                          ))}
                          {totalItens > 3 && (
                            <div className="text-xs text-gray-500 text-center py-1">
                              +{totalItens - 3} itens adicionais
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {recebimento.observacoes && (
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-medium">Observações:</span> {recebimento.observacoes}
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
          );
        })}

        {(!recebimentos || recebimentos.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum recebimento encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Comece registrando seu primeiro recebimento de mercadorias.'
                }
              </p>
              {!searchTerm && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Recebimento
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
