
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Heart, Smile, Pill, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ConveniosSectionProps {
  form: UseFormReturn<any>;
}

interface Convenio {
  id: string;
  nome: string;
  tipo: string;
  empresa_convenio?: string;
  descricao?: string;
}

interface ConvenioSelecionado extends Convenio {
  numero_carteira: string;
  data_adesao: string;
}

const iconMap = {
  medico: Heart,
  odontologico: Smile,
  farmacia: Pill,
  educacao: GraduationCap,
  outros: Shield,
};

const colorMap = {
  medico: 'bg-red-100 text-red-800',
  odontologico: 'bg-blue-100 text-blue-800',
  farmacia: 'bg-green-100 text-green-800',
  educacao: 'bg-purple-100 text-purple-800',
  outros: 'bg-gray-100 text-gray-800',
};

export function ConveniosSection({ form }: ConveniosSectionProps) {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [selectedConvenios, setSelectedConvenios] = useState<ConvenioSelecionado[]>([]);

  useEffect(() => {
    const fetchConvenios = async () => {
      try {
        const { data } = await supabase
          .from('convenios')
          .select('*')
          .eq('ativo', true)
          .order('tipo', { ascending: true });

        if (data) setConvenios(data as Convenio[]);
      } catch (error) {
        console.error('Erro ao carregar convênios:', error);
      }
    };

    fetchConvenios();
  }, []);

  const groupedConvenios = convenios.reduce((acc, convenio) => {
    if (!acc[convenio.tipo]) {
      acc[convenio.tipo] = [];
    }
    acc[convenio.tipo].push(convenio);
    return acc;
  }, {} as Record<string, Convenio[]>);

  const handleConvenioToggle = (convenio: Convenio, checked: boolean) => {
    if (checked) {
      setSelectedConvenios([...selectedConvenios, { ...convenio, numero_carteira: '', data_adesao: '' }]);
    } else {
      setSelectedConvenios(selectedConvenios.filter(c => c.id !== convenio.id));
    }
  };

  const updateConvenioData = (convenioId: string, field: string, value: string) => {
    setSelectedConvenios(selectedConvenios.map(c => 
      c.id === convenioId ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Convênios Disponíveis
        </h3>
        
        <div className="grid gap-6">
          {Object.entries(groupedConvenios).map(([tipo, conveniosTipo]) => {
            const Icon = iconMap[tipo as keyof typeof iconMap] || Shield;
            const colorClass = colorMap[tipo as keyof typeof colorMap];
            
            return (
              <Card key={tipo} className="bg-white/80 backdrop-blur-sm border-slate-200/60">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-5 w-5" />
                    <span className="capitalize">{tipo}</span>
                    <Badge variant="secondary" className={colorClass}>
                      {conveniosTipo.length} disponível(eis)
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conveniosTipo.map((convenio) => {
                    const isSelected = selectedConvenios.some(c => c.id === convenio.id);
                    const selectedConvenio = selectedConvenios.find(c => c.id === convenio.id);
                    
                    return (
                      <div key={convenio.id} className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50/80 transition-colors">
                          <Checkbox
                            id={convenio.id}
                            checked={isSelected}
                            onCheckedChange={(checked) => handleConvenioToggle(convenio, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={convenio.id} className="font-medium cursor-pointer">
                              {convenio.nome}
                            </Label>
                            {convenio.empresa_convenio && (
                              <p className="text-sm text-slate-600 mt-1">{convenio.empresa_convenio}</p>
                            )}
                            {convenio.descricao && (
                              <p className="text-sm text-slate-500 mt-1">{convenio.descricao}</p>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="ml-6 p-3 bg-blue-50/80 rounded-lg border border-blue-200 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm font-medium">Número da Carteira</Label>
                                <Input
                                  placeholder="Digite o número da carteira"
                                  value={selectedConvenio?.numero_carteira || ''}
                                  onChange={(e) => updateConvenioData(convenio.id, 'numero_carteira', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Data de Adesão</Label>
                                <Input
                                  type="date"
                                  value={selectedConvenio?.data_adesao || ''}
                                  onChange={(e) => updateConvenioData(convenio.id, 'data_adesao', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedConvenios.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Convênios Selecionados:</h4>
            <div className="space-y-2">
              {selectedConvenios.map((convenio) => (
                <div key={convenio.id} className="flex items-center justify-between text-sm text-green-700">
                  <span>{convenio.nome}</span>
                  <span className="text-xs">
                    {convenio.numero_carteira ? `Carteira: ${convenio.numero_carteira}` : 'Carteira não informada'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
