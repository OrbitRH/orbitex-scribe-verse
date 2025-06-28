
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ColaboradorBeneficio {
  id: string;
  colaborador: {
    nome_completo: string;
    matricula: string;
    email_corporativo: string;
  };
  tipo_beneficio: {
    nome: string;
    categoria: string;
  };
  data_inicio: string;
  data_fim?: string;
  valor_desconto?: number;
  ativo: boolean;
}

export function ColaboradoresBeneficios() {
  const [colaboradoresBeneficios, setColaboradoresBeneficios] = useState<ColaboradorBeneficio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchColaboradoresBeneficios();
  }, []);

  const fetchColaboradoresBeneficios = async () => {
    try {
      const { data, error } = await supabase
        .from('colaboradores_beneficios')
        .select(`
          *,
          colaborador:colaboradores(nome_completo, matricula, email_corporativo),
          tipo_beneficio:tipos_beneficios(nome, categoria)
        `)
        .order('data_inicio', { ascending: false });

      if (error) throw error;
      setColaboradoresBeneficios(data || []);
    } catch (error) {
      console.error('Erro ao carregar colaboradores com benefícios:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = colaboradoresBeneficios.filter(item =>
    item.colaborador?.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.colaborador?.matricula?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo_beneficio?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar colaboradores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Vincular Benefício
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
                {searchTerm ? 'Nenhum registro encontrado' : 'Nenhum colaborador com benefícios'}
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
                    <Badge className={categoryColors[item.tipo_beneficio?.categoria as keyof typeof categoryColors]}>
                      {item.tipo_beneficio?.categoria}
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
                    <span className="font-medium">Benefício:</span>
                    <p className="text-gray-600">{item.tipo_beneficio?.nome}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(item.data_inicio).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {item.data_fim && (
                    <div>
                      <span className="font-medium">Data Fim:</span>
                      <p className="text-gray-600">
                        {new Date(item.data_fim).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {item.valor_desconto && (
                    <div>
                      <span className="font-medium">Desconto:</span>
                      <p className="text-gray-600">R$ {item.valor_desconto.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
