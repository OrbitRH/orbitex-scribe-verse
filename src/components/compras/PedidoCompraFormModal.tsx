
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PedidoCompra, StatusPedidoCompra } from '@/types/compras';
import { PedidoCompraItensForm } from './PedidoCompraItensForm';

interface PedidoCompraFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedido?: PedidoCompra | null;
  onSuccess: () => void;
}

export function PedidoCompraFormModal({ isOpen, onClose, pedido, onSuccess }: PedidoCompraFormModalProps) {
  const [formData, setFormData] = useState({
    empresa_fornecedor_id: '',
    data_pedido: new Date().toISOString().split('T')[0],
    data_entrega_prevista: '',
    status: 'rascunho' as StatusPedidoCompra,
    desconto_total: 0,
    valor_frete: 0,
    observacoes: '',
    condicoes_pagamento: '',
    prazo_entrega_dias: 0
  });

  const [itens, setItens] = useState<any[]>([]);

  // Carregar fornecedores
  const { data: fornecedores } = useQuery({
    queryKey: ['fornecedores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empresas')
        .select('id, razao_social, nome_fantasia')
        .eq('ativo', true)
        .in('tipo_empresa', ['fornecedor', 'ambos'])
        .order('razao_social');
      
      if (error) throw error;
      return data;
    }
  });

  // Carregar dados do pedido se estiver editando
  useEffect(() => {
    if (pedido) {
      setFormData({
        empresa_fornecedor_id: pedido.empresa_fornecedor_id || '',
        data_pedido: pedido.data_pedido,
        data_entrega_prevista: pedido.data_entrega_prevista || '',
        status: pedido.status,
        desconto_total: pedido.desconto_total,
        valor_frete: pedido.valor_frete,
        observacoes: pedido.observacoes || '',
        condicoes_pagamento: pedido.condicoes_pagamento || '',
        prazo_entrega_dias: pedido.prazo_entrega_dias || 0
      });
      setItens(pedido.itens || []);
    } else {
      // Reset form para novo pedido
      setFormData({
        empresa_fornecedor_id: '',
        data_pedido: new Date().toISOString().split('T')[0],
        data_entrega_prevista: '',
        status: 'rascunho',
        desconto_total: 0,
        valor_frete: 0,
        observacoes: '',
        condicoes_pagamento: '',
        prazo_entrega_dias: 0
      });
      setItens([]);
    }
  }, [pedido]);

  // Calcular valor total
  const valorTotal = itens.reduce((total, item) => total + (item.valor_total || 0), 0) 
    + formData.valor_frete - formData.desconto_total;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (pedido) {
        // Atualizar pedido existente
        const { error } = await supabase
          .from('pedidos_compra')
          .update({
            ...data,
            valor_total: valorTotal,
            updated_at: new Date().toISOString()
          })
          .eq('id', pedido.id);
        
        if (error) throw error;
        return pedido.id;
      } else {
        // Criar novo pedido
        const { data: newPedido, error } = await supabase
          .from('pedidos_compra')
          .insert({
            ...data,
            valor_total: valorTotal
          })
          .select()
          .single();
        
        if (error) throw error;
        return newPedido.id;
      }
    },
    onSuccess: (pedidoId) => {
      toast.success(pedido ? 'Pedido atualizado com sucesso!' : 'Pedido criado com sucesso!');
      onSuccess();
    },
    onError: (error) => {
      console.error('Erro ao salvar pedido:', error);
      toast.error('Erro ao salvar pedido. Tente novamente.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.empresa_fornecedor_id) {
      toast.error('Selecione um fornecedor');
      return;
    }

    if (itens.length === 0) {
      toast.error('Adicione pelo menos um item ao pedido');
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {pedido ? 'Editar Pedido de Compra' : 'Novo Pedido de Compra'}
          </DialogTitle>
          <DialogDescription>
            {pedido ? 'Atualize as informações do pedido' : 'Preencha os dados para criar um novo pedido'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do Cabeçalho */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select 
                value={formData.empresa_fornecedor_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, empresa_fornecedor_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedores?.map((fornecedor) => (
                    <SelectItem key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.nome_fantasia || fornecedor.razao_social}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as StatusPedidoCompra }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="pendente_aprovacao">Pendente Aprovação</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="recebido_parcial">Recebido Parcial</SelectItem>
                  <SelectItem value="recebido_total">Recebido Total</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="data_pedido">Data do Pedido *</Label>
              <Input
                id="data_pedido"
                type="date"
                value={formData.data_pedido}
                onChange={(e) => setFormData(prev => ({ ...prev, data_pedido: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="data_entrega_prevista">Data de Entrega Prevista</Label>
              <Input
                id="data_entrega_prevista"
                type="date"
                value={formData.data_entrega_prevista}
                onChange={(e) => setFormData(prev => ({ ...prev, data_entrega_prevista: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="prazo_entrega_dias">Prazo de Entrega (dias)</Label>
              <Input
                id="prazo_entrega_dias"
                type="number"
                value={formData.prazo_entrega_dias}
                onChange={(e) => setFormData(prev => ({ ...prev, prazo_entrega_dias: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Itens do Pedido */}
          <div>
            <Label>Itens do Pedido *</Label>
            <PedidoCompraItensForm 
              itens={itens}
              onChange={setItens}
            />
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="valor_frete">Valor do Frete</Label>
              <Input
                id="valor_frete"
                type="number"
                step="0.01"
                value={formData.valor_frete}
                onChange={(e) => setFormData(prev => ({ ...prev, valor_frete: Number(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="desconto_total">Desconto Total</Label>
              <Input
                id="desconto_total"
                type="number"
                step="0.01"
                value={formData.desconto_total}
                onChange={(e) => setFormData(prev => ({ ...prev, desconto_total: Number(e.target.value) }))}
              />
            </div>

            <div>
              <Label>Valor Total</Label>
              <div className="text-2xl font-bold text-green-600 mt-2">
                R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Observações e Condições */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="condicoes_pagamento">Condições de Pagamento</Label>
              <Textarea
                id="condicoes_pagamento"
                value={formData.condicoes_pagamento}
                onChange={(e) => setFormData(prev => ({ ...prev, condicoes_pagamento: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando...' : (pedido ? 'Atualizar' : 'Criar Pedido')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
