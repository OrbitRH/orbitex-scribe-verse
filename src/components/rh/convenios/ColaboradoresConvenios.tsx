
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ColaboradorConvenio {
  id: string;
  numero_carteira?: string;
  data_adesao: string;
  data_cancelamento?: string;
  valor_mensal?: number;
  ativo: boolean;
  colaborador: {
    nome_completo: string;
    matricula: string;
    email_corporativo: string;
  };
  convenio: {
    nome: string;
    tipo: string;
  };
}

export function ColaboradoresConvenios() {
  const [colaboradoresConvenios, setColaboradoresConvenios] = useState<ColaboradorConvenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchColaboradoresConvenios();
  }, []);

  const fetchColaboradoresConvenios = async () => {
    try {
      const { data, error } = await supabase
        .from('colaboradores_convenios')
        .select(`
          *,
          colaborador:colaboradores(nome_completo, matricula, email_corporativo),
          convenio:convenios(nome, tipo)
        `)
        .order('data_adesao', { ascending: false });

      if (error) throw error;
      setColaboradoresConvenios(data || []);
    } catch (error) {
      console.error('Erro ao carregar colaboradores com convênios:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = colaboradoresConvenios.filter(item =>
    item.colaborador?.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.colaborador?.matricula?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.convenio?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar colaboradores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Vincular Convênio
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Carregando dados...</div>
        ) : filteredData.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum registro encontrado' : 'Nenhum colaborador com convênios'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredData.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{item.colaborador?.nome_completo}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {item.colaborador?.matricula} • {item.colaborador?.email_corporativo}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={typeColors[item.convenio?.tipo as keyof typeof typeColors]}>
                      {item.convenio?.tipo}
                    </Badge>
                    {!item.ativo && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Convênio:</span>
                    <p className="text-gray-600">{item.convenio?.nome}</p>
                  </div>
                  {item.numero_carteira && (
                    <div>
                      <span className="font-medium">Carteira:</span>
                      <p className="text-gray-600">{item.numero_carteira}</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(item.data_adesao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {item.valor_mensal && (
                    <div>
                      <span className="font-medium">Valor Mensal:</span>
                      <p className="text-gray-600">R$ {item.valor_mensal.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                {item.data_cancelamento && (
                  <div className="mt-3 text-sm">
                    <span className="font-medium">Data Cancelamento:</span>
                    <span className="text-red-600 ml-2">
                      {new Date(item.data_cancelamento).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
