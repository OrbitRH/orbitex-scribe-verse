
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BeneficioFormModal } from './BeneficioFormModal';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TipoBeneficio = Database['public']['Tables']['tipos_beneficios']['Row'];

export function BeneficiosGestao() {
  const [beneficios, setBeneficios] = useState<TipoBeneficio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeneficio, setEditingBeneficio] = useState<TipoBeneficio | null>(null);

  useEffect(() => {
    fetchBeneficios();
  }, []);

  const fetchBeneficios = async () => {
    try {
      const { data, error } = await supabase
        .from('tipos_beneficios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setBeneficios(data || []);
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
      toast.error('Erro ao carregar benefícios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (beneficio: TipoBeneficio) => {
    setEditingBeneficio(beneficio);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este benefício?')) return;

    try {
      const { error } = await supabase
        .from('tipos_beneficios')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Benefício desativado com sucesso');
      fetchBeneficios();
    } catch (error) {
      console.error('Erro ao desativar benefício:', error);
      toast.error('Erro ao desativar benefício');
    }
  };

  const filteredBeneficios = beneficios.filter(beneficio =>
    beneficio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficio.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (beneficio.codigo && beneficio.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categoryColors = {
    saude: 'bg-red-100 text-red-800',
    alimentacao: 'bg-green-100 text-green-800',
    transporte: 'bg-blue-100 text-blue-800',
    educacao: 'bg-purple-100 text-purple-800',
    outros: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar benefícios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button onClick={() => {
          setEditingBeneficio(null);
          setIsModalOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Benefício
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Carregando benefícios...</div>
        ) : filteredBeneficios.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum benefício encontrado' : 'Nenhum benefício cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBeneficios.map((beneficio) => (
            <Card key={beneficio.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-lg">{beneficio.nome}</CardTitle>
                    {beneficio.codigo && (
                      <Badge variant="outline">{beneficio.codigo}</Badge>
                    )}
                    <Badge className={categoryColors[beneficio.categoria as keyof typeof categoryColors]}>
                      {beneficio.categoria}
                    </Badge>
                    {beneficio.obrigatorio && (
                      <Badge variant="destructive">Obrigatório</Badge>
                    )}
                    {!beneficio.ativo && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(beneficio)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(beneficio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {beneficio.descricao && (
                  <p className="text-gray-600 mb-3">{beneficio.descricao}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Periodicidade:</span>
                    <p className="text-gray-600 capitalize">{beneficio.periodicidade || 'Mensal'}</p>
                  </div>
                  {beneficio.valor_empresa && (
                    <div>
                      <span className="font-medium">Valor Empresa:</span>
                      <p className="text-gray-600">R$ {beneficio.valor_empresa.toFixed(2)}</p>
                    </div>
                  )}
                  {beneficio.valor_desconto && (
                    <div>
                      <span className="font-medium">Desconto:</span>
                      <p className="text-gray-600">
                        {beneficio.tipo_desconto === 'percentual' 
                          ? `${beneficio.valor_desconto}%` 
                          : `R$ ${beneficio.valor_desconto.toFixed(2)}`}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Dependentes:</span>
                    <p className="text-gray-600">
                      {beneficio.permite_dependentes ? 'Permitido' : 'Não permitido'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <BeneficioFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBeneficio(null);
        }}
        beneficio={editingBeneficio}
        onSuccess={() => {
          fetchBeneficios();
          setIsModalOpen(false);
          setEditingBeneficio(null);
        }}
      />
    </div>
  );
}
