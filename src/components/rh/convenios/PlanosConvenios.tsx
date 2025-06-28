
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PlanoConvenio {
  id: string;
  nome: string;
  codigo?: string;
  valor_mensal?: number;
  valor_coparticipacao?: number;
  carencia_dias?: number;
  abrangencia?: string;
  cobertura?: string;
  ativo: boolean;
  convenio: {
    nome: string;
    tipo: string;
  };
}

export function PlanosConvenios() {
  const [planos, setPlanos] = useState<PlanoConvenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlanos();
  }, []);

  const fetchPlanos = async () => {
    try {
      const { data, error } = await supabase
        .from('planos_convenios')
        .select(`
          *,
          convenio:convenios(nome, tipo)
        `)
        .order('nome');

      if (error) throw error;
      setPlanos(data || []);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      toast.error('Erro ao carregar planos');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlanos = planos.filter(plano =>
    plano.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plano.convenio?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plano.codigo && plano.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar planos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Carregando planos...</div>
        ) : filteredPlanos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum plano encontrado' : 'Nenhum plano cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPlanos.map((plano) => (
            <Card key={plano.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{plano.nome}</CardTitle>
                      <p className="text-sm text-gray-500">{plano.convenio?.nome}</p>
                    </div>
                    {plano.codigo && (
                      <Badge variant="outline">{plano.codigo}</Badge>
                    )}
                    <Badge variant="secondary">{plano.convenio?.tipo}</Badge>
                    {!plano.ativo && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  {plano.valor_mensal && (
                    <div>
                      <span className="font-medium">Valor Mensal:</span>
                      <p className="text-gray-600">R$ {plano.valor_mensal.toFixed(2)}</p>
                    </div>
                  )}
                  {plano.valor_coparticipacao && (
                    <div>
                      <span className="font-medium">Coparticipação:</span>
                      <p className="text-gray-600">R$ {plano.valor_coparticipacao.toFixed(2)}</p>
                    </div>
                  )}
                  {plano.carencia_dias !== undefined && (
                    <div>
                      <span className="font-medium">Carência:</span>
                      <p className="text-gray-600">{plano.carencia_dias} dias</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="text-gray-600">{plano.ativo ? 'Ativo' : 'Inativo'}</p>
                  </div>
                </div>
                
                {plano.abrangencia && (
                  <div className="mt-3">
                    <span className="font-medium text-sm">Abrangência:</span>
                    <p className="text-gray-600 text-sm">{plano.abrangencia}</p>
                  </div>
                )}

                {plano.cobertura && (
                  <div className="mt-2">
                    <span className="font-medium text-sm">Cobertura:</span>
                    <p className="text-gray-600 text-sm">{plano.cobertura}</p>
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
