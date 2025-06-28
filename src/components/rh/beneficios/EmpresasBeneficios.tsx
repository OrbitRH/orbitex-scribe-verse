
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Building2, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { EmpresaBeneficioFormModal } from './EmpresaBeneficioFormModal';
import { toast } from 'sonner';

interface EmpresaBeneficio {
  id: string;
  nome: string;
  cnpj?: string;
  razao_social?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  contato_responsavel?: string;
  observacoes?: string;
  ativo: boolean;
}

export function EmpresasBeneficios() {
  const [empresas, setEmpresas] = useState<EmpresaBeneficio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<EmpresaBeneficio | null>(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const { data, error } = await supabase
        .from('empresas_beneficios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setEmpresas(data || []);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      toast.error('Erro ao carregar empresas');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (empresa: EmpresaBeneficio) => {
    setEditingEmpresa(empresa);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return;

    try {
      const { error } = await supabase
        .from('empresas_beneficios')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Empresa desativada com sucesso');
      fetchEmpresas();
    } catch (error) {
      console.error('Erro ao desativar empresa:', error);
      toast.error('Erro ao desativar empresa');
    }
  };

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.razao_social?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.cnpj?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button onClick={() => {
          setEditingEmpresa(null);
          setIsModalOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Carregando empresas...</div>
        ) : filteredEmpresas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa cadastrada'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEmpresas.map((empresa) => (
            <Card key={empresa.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                      {empresa.razao_social && empresa.razao_social !== empresa.nome && (
                        <p className="text-sm text-gray-500">{empresa.razao_social}</p>
                      )}
                    </div>
                    {!empresa.ativo && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(empresa)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(empresa.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {empresa.cnpj && (
                    <div>
                      <span className="font-medium">CNPJ:</span>
                      <p className="text-gray-600">{empresa.cnpj}</p>
                    </div>
                  )}
                  {empresa.telefone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{empresa.telefone}</span>
                    </div>
                  )}
                  {empresa.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{empresa.email}</span>
                    </div>
                  )}
                </div>
                
                {empresa.contato_responsavel && (
                  <div className="mt-3">
                    <span className="font-medium text-sm">Contato:</span>
                    <p className="text-gray-600 text-sm">{empresa.contato_responsavel}</p>
                  </div>
                )}

                {empresa.endereco && (
                  <div className="mt-3">
                    <span className="font-medium text-sm">Endereço:</span>
                    <p className="text-gray-600 text-sm">{empresa.endereco}</p>
                  </div>
                )}

                {empresa.observacoes && (
                  <div className="mt-3">
                    <span className="font-medium text-sm">Observações:</span>
                    <p className="text-gray-600 text-sm">{empresa.observacoes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <EmpresaBeneficioFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmpresa(null);
        }}
        empresa={editingEmpresa}
        onSuccess={() => {
          fetchEmpresas();
          setIsModalOpen(false);
          setEditingEmpresa(null);
        }}
      />
    </div>
  );
}
