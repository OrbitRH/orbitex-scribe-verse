
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Edit, Trash2 } from 'lucide-react';
import { Convenio } from '../types/ConvenioTypes';

interface ConvenioCardProps {
  convenio: Convenio;
  onEdit: (convenio: Convenio) => void;
  onDelete: (id: string) => void;
}

export function ConvenioCard({ convenio, onEdit, onDelete }: ConvenioCardProps) {
  const typeColors = {
    medico: 'bg-red-100 text-red-800',
    odontologico: 'bg-blue-100 text-blue-800',
    farmacia: 'bg-green-100 text-green-800',
    educacao: 'bg-purple-100 text-purple-800',
    outros: 'bg-gray-100 text-gray-800',
  };

  return (
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
              onClick={() => onEdit(convenio)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(convenio.id)}
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
  );
}
