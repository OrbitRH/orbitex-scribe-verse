
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { TipoBeneficio } from '../types/BeneficioTypes';

interface BeneficioCardProps {
  beneficio: TipoBeneficio;
  onEdit: (beneficio: TipoBeneficio) => void;
  onDelete: (id: string) => void;
}

export function BeneficioCard({ beneficio, onEdit, onDelete }: BeneficioCardProps) {
  const categoryColors = {
    saude: 'bg-red-100 text-red-800',
    alimentacao: 'bg-green-100 text-green-800',
    transporte: 'bg-blue-100 text-blue-800',
    educacao: 'bg-purple-100 text-purple-800',
    outros: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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
              onClick={() => onEdit(beneficio)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(beneficio.id)}
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
  );
}
