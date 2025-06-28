import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ConvenioFormModal } from './ConvenioFormModal';
import { toast } from 'sonner';
import { Convenio } from './types/ConvenioTypes';

export function ConveniosGestao() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConvenio, setEditingConvenio] = useState<Convenio | null>(null);

  useEffect(() => {
    fetchConvenios();
  }, []);

  const fetchConvenios = async () => {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setConvenios(data || []);
    } catch (error) {
      console.error('Erro ao carregar convênios:', error);
      toast.error('Erro ao carregar convênios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (convenio: Convenio) => {
    setEditingConvenio(convenio);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este convênio?')) return;

    try {
      const { error } = await supabase
        .from('convenios')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Convênio desativado com sucesso');
      fetchConvenios();
    } catch (error) {
      console.error('Erro ao desativar convênio:', error);
      toast.error('Erro ao desativar convênio');
    }
  };

  const filteredConvenios = convenios.filter(convenio =>
    convenio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convenio.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (convenio.codigo && convenio.codigo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (convenio.empresa_convenio && convenio.empresa_convenio.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const typeColors = {
    medico: 'bg-red-100 text-red-800',
    odontologico: 'bg-blue-100 text-blue-800',
    farmacia: 'bg-green-100 text-green-800',
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
              placeholder="Buscar convênios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button onClick={() => {
          setEditingConvenio(null);
          setIsModalOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Convênio
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Carregando convênios...</div>
        ) : filteredConvenios.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum convênio encontrado' : 'Nenhum convênio cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConvenios.map((convenio) => (
            <Card key={convenio.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{convenio.nome}</CardTitle>
                      {convenio.empresa_convenio && (
                        <p className="text-sm text-gray-500">{convenio.empresa_convenio}</p>
                      )}
                    </div>
                    {convenio.codigo && (
                      <Badge variant="outline">{convenio.codigo}</Badge>
                    )}
                    <Badge className={typeColors[convenio.tipo as keyof typeof typeColors]}>
                      {convenio.tipo}
                    </Badge>
                    {convenio.permite_dependentes && (
                      <Badge variant="secondary">Dependentes</Badge>
                    )}
                    {!convenio.ativo && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(convenio)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(convenio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {convenio.descricao && (
                  <p className="text-gray-600 mb-3">{convenio.descricao}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {convenio.ans_registro && (
                    <div>
                      <span className="font-medium">ANS:</span>
                      <p className="text-gray-600">{convenio.ans_registro}</p>
                    </div>
                  )}
                  {convenio.contato && (
                    <div>
                      <span className="font-medium">Contato:</span>
                      <p className="text-gray-600">{convenio.contato}</p>
                    </div>
                  )}
                  {convenio.telefone && (
                    <div>
                      <span className="font-medium">Telefone:</span>
                      <p className="text-gray-600">{convenio.telefone}</p>
                    </div>
                  )}
                </div>
                {(convenio.email || convenio.site) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                    {convenio.email && (
                      <div>
                        <span className="font-medium">E-mail:</span>
                        <p className="text-gray-600">{convenio.email}</p>
                      </div>
                    )}
                    {convenio.site && (
                      <div>
                        <span className="font-medium">Site:</span>
                        <p className="text-gray-600">{convenio.site}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <ConvenioFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingConvenio(null);
        }}
        convenio={editingConvenio}
        onSuccess={() => {
          fetchConvenios();
          setIsModalOpen(false);
          setEditingConvenio(null);
        }}
      />
    </div>
  );
}
