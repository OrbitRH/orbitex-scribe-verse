
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PedidoCompraItem {
  id?: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  desconto_percentual: number;
  valor_total: number;
  observacoes?: string;
  produto?: {
    codigo_interno: string;
    nome_comercial: string;
  };
}

interface PedidoCompraItensFormProps {
  itens: PedidoCompraItem[];
  onChange: (itens: PedidoCompraItem[]) => void;
}

export function PedidoCompraItensForm({ itens, onChange }: PedidoCompraItensFormProps) {
  const [novoItem, setNovoItem] = useState<Partial<PedidoCompraItem>>({
    produto_id: '',
    quantidade: 1,
    preco_unitario: 0,
    desconto_percentual: 0,
    valor_total: 0,
    observacoes: ''
  });

  // Carregar produtos
  const { data: produtos } = useQuery({
    queryKey: ['produtos-compras'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('id, codigo_interno, nome_comercial, preco_medio_compra')
        .eq('situacao', true)
        .order('nome_comercial');
      
      if (error) throw error;
      return data;
    }
  });

  // Calcular valor total do item
  const calcularValorTotal = (quantidade: number, precoUnitario: number, desconto: number) => {
    const subtotal = quantidade * precoUnitario;
    const valorDesconto = subtotal * (desconto / 100);
    return subtotal - valorDesconto;
  };

  const handleProdutoChange = (produtoId: string) => {
    const produto = produtos?.find(p => p.id === produtoId);
    const precoSugerido = produto?.preco_medio_compra || 0;
    
    setNovoItem(prev => ({
      ...prev,
      produto_id: produtoId,
      preco_unitario: precoSugerido,
      valor_total: calcularValorTotal(prev.quantidade || 1, precoSugerido, prev.desconto_percentual || 0)
    }));
  };

  const handleQuantidadeChange = (quantidade: number) => {
    setNovoItem(prev => ({
      ...prev,
      quantidade,
      valor_total: calcularValorTotal(quantidade, prev.preco_unitario || 0, prev.desconto_percentual || 0)
    }));
  };

  const handlePrecoChange = (preco: number) => {
    setNovoItem(prev => ({
      ...prev,
      preco_unitario: preco,
      valor_total: calcularValorTotal(prev.quantidade || 1, preco, prev.desconto_percentual || 0)
    }));
  };

  const handleDescontoChange = (desconto: number) => {
    setNovoItem(prev => ({
      ...prev,
      desconto_percentual: desconto,
      valor_total: calcularValorTotal(prev.quantidade || 1, prev.preco_unitario || 0, desconto)
    }));
  };

  const adicionarItem = () => {
    if (!novoItem.produto_id) {
      toast.error('Selecione um produto');
      return;
    }

    if (!novoItem.quantidade || novoItem.quantidade <= 0) {
      toast.error('Informe uma quantidade válida');
      return;
    }

    if (!novoItem.preco_unitario || novoItem.preco_unitario <= 0) {
      toast.error('Informe um preço unitário válido');
      return;
    }

    const produto = produtos?.find(p => p.id === novoItem.produto_id);
    
    const itemCompleto: PedidoCompraItem = {
      produto_id: novoItem.produto_id!,
      quantidade: novoItem.quantidade!,
      preco_unitario: novoItem.preco_unitario!,
      desconto_percentual: novoItem.desconto_percentual || 0,
      valor_total: novoItem.valor_total!,
      observacoes: novoItem.observacoes || '',
      produto: produto ? {
        codigo_interno: produto.codigo_interno,
        nome_comercial: produto.nome_comercial
      } : undefined
    };

    onChange([...itens, itemCompleto]);
    
    // Resetar formulário
    setNovoItem({
      produto_id: '',
      quantidade: 1,
      preco_unitario: 0,
      desconto_percentual: 0,
      valor_total: 0,
      observacoes: ''
    });

    toast.success('Item adicionado com sucesso!');
  };

  const removerItem = (index: number) => {
    const novosItens = itens.filter((_, i) => i !== index);
    onChange(novosItens);
    toast.success('Item removido com sucesso!');
  };

  const totalGeral = itens.reduce((total, item) => total + item.valor_total, 0);

  return (
    <div className="space-y-4">
      {/* Formulário para adicionar novo item */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="font-medium mb-3">Adicionar Item</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="produto">Produto *</Label>
            <Select 
              value={novoItem.produto_id} 
              onValueChange={handleProdutoChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {produtos?.map((produto) => (
                  <SelectItem key={produto.id} value={produto.id}>
                    {produto.codigo_interno} - {produto.nome_comercial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantidade">Quantidade *</Label>
            <Input
              id="quantidade"
              type="number"
              step="0.001"
              min="0"
              value={novoItem.quantidade}
              onChange={(e) => handleQuantidadeChange(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="preco_unitario">Preço Unitário *</Label>
            <Input
              id="preco_unitario"
              type="number"
              step="0.0001"
              min="0"
              value={novoItem.preco_unitario}
              onChange={(e) => handlePrecoChange(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="desconto">Desconto (%)</Label>
            <Input
              id="desconto"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={novoItem.desconto_percentual}
              onChange={(e) => handleDescontoChange(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Valor Total</Label>
            <div className="mt-2 text-lg font-bold text-green-600">
              R$ {(novoItem.valor_total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Label htmlFor="observacoes_item">Observações</Label>
          <Textarea
            id="observacoes_item"
            value={novoItem.observacoes}
            onChange={(e) => setNovoItem(prev => ({ ...prev, observacoes: e.target.value }))}
            rows={2}
          />
        </div>

        <div className="mt-3">
          <Button type="button" onClick={adicionarItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Item
          </Button>
        </div>
      </div>

      {/* Lista de itens adicionados */}
      {itens.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Itens do Pedido ({itens.length})</h4>
          
          <div className="space-y-2">
            {itens.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="font-medium">{item.produto?.nome_comercial}</p>
                    <p className="text-gray-500">{item.produto?.codigo_interno}</p>
                  </div>
                  
                  <div>
                    <p>Qtd: {item.quantidade}</p>
                    <p>Preço: R$ {item.preco_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</p>
                  </div>
                  
                  <div>
                    {item.desconto_percentual > 0 && (
                      <p>Desconto: {item.desconto_percentual}%</p>
                    )}
                    <p className="font-medium text-green-600">
                      Total: R$ {item.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
                  <div>
                    {item.observacoes && (
                      <p className="text-gray-600 text-xs">{item.observacoes}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removerItem(index)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3 border-t">
            <div className="text-lg font-bold">
              Total dos Itens: R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      )}

      {itens.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum item adicionado ao pedido</p>
          <p className="text-sm">Use o formulário acima para adicionar itens</p>
        </div>
      )}
    </div>
  );
}
