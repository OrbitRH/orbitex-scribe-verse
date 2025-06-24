
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, Car, GraduationCap, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BeneficiosSectionProps {
  form: UseFormReturn<any>;
}

const iconMap = {
  saude: Heart,
  alimentacao: Gift,
  transporte: Car,
  educacao: GraduationCap,
  outros: Shield,
};

const colorMap = {
  saude: 'bg-red-100 text-red-800',
  alimentacao: 'bg-green-100 text-green-800',
  transporte: 'bg-blue-100 text-blue-800',
  educacao: 'bg-purple-100 text-purple-800',
  outros: 'bg-gray-100 text-gray-800',
};

export function BeneficiosSection({ form }: BeneficiosSectionProps) {
  const [beneficios, setBeneficios] = useState<any[]>([]);
  const [selectedBeneficios, setSelectedBeneficios] = useState<string[]>([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const { data } = await supabase
          .from('tipos_beneficios')
          .select('*')
          .eq('ativo', true)
          .order('categoria', { ascending: true });

        if (data) setBeneficios(data);
      } catch (error) {
        console.error('Erro ao carregar benefícios:', error);
      }
    };

    fetchBeneficios();
  }, []);

  const groupedBeneficios = beneficios.reduce((acc, beneficio) => {
    if (!acc[beneficio.categoria]) {
      acc[beneficio.categoria] = [];
    }
    acc[beneficio.categoria].push(beneficio);
    return acc;
  }, {} as Record<string, any[]>);

  const handleBeneficioToggle = (beneficioId: string, checked: boolean) => {
    if (checked) {
      setSelectedBeneficios([...selectedBeneficios, beneficioId]);
    } else {
      setSelectedBeneficios(selectedBeneficios.filter(id => id !== beneficioId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Benefícios Disponíveis
        </h3>
        
        <div className="grid gap-6">
          {Object.entries(groupedBeneficios).map(([categoria, beneficiosCategoria]) => {
            const Icon = iconMap[categoria as keyof typeof iconMap] || Shield;
            const colorClass = colorMap[categoria as keyof typeof colorMap];
            
            return (
              <Card key={categoria} className="bg-white/80 backdrop-blur-sm border-slate-200/60">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-5 w-5" />
                    <span className="capitalize">{categoria}</span>
                    <Badge variant="secondary" className={colorClass}>
                      {beneficiosCategoria.length} disponível(eis)
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {beneficiosCategoria.map((beneficio) => (
                    <div key={beneficio.id} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50/80 transition-colors">
                      <Checkbox
                        id={beneficio.id}
                        checked={selectedBeneficios.includes(beneficio.id)}
                        onCheckedChange={(checked) => handleBeneficioToggle(beneficio.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={beneficio.id} className="font-medium cursor-pointer">
                          {beneficio.nome}
                          {beneficio.obrigatorio && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Obrigatório
                            </Badge>
                          )}
                        </Label>
                        {beneficio.descricao && (
                          <p className="text-sm text-slate-600 mt-1">{beneficio.descricao}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          {beneficio.valor_empresa > 0 && (
                            <span>Empresa: R$ {beneficio.valor_empresa.toFixed(2)}</span>
                          )}
                          {beneficio.valor_desconto > 0 && (
                            <span>
                              Desconto: {beneficio.tipo_desconto === 'percentual' ? `${beneficio.valor_desconto}%` : `R$ ${beneficio.valor_desconto.toFixed(2)}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
