
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Edit, 
  Eye,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColaboradorCardProps {
  colaborador: any;
  onEdit: () => void;
  onView: () => void;
}

const statusColors = {
  ativo: 'bg-green-100 text-green-800',
  inativo: 'bg-red-100 text-red-800',
  ferias: 'bg-blue-100 text-blue-800',
  licenca: 'bg-yellow-100 text-yellow-800',
  afastado: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
  ativo: 'Ativo',
  inativo: 'Inativo',
  ferias: 'Férias',
  licenca: 'Licença',
  afastado: 'Afastado',
};

export function ColaboradorCard({ colaborador, onEdit, onView }: ColaboradorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={colaborador.foto_url} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {getInitials(colaborador.nome_completo)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">
                {colaborador.nome_completo}
              </h3>
              <p className="text-sm text-slate-600">
                Matrícula: {colaborador.matricula}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={statusColors[colaborador.status as keyof typeof statusColors]}>
              {statusLabels[colaborador.status as keyof typeof statusLabels]}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-3">
          {colaborador.cargo && (
            <div className="flex items-center text-sm text-slate-600">
              <Briefcase className="h-4 w-4 mr-2 text-slate-400" />
              <span>{colaborador.cargo.titulo}</span>
            </div>
          )}

          {colaborador.email_corporativo && (
            <div className="flex items-center text-sm text-slate-600">
              <Mail className="h-4 w-4 mr-2 text-slate-400" />
              <span className="truncate">{colaborador.email_corporativo}</span>
            </div>
          )}

          {colaborador.telefone_principal && (
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="h-4 w-4 mr-2 text-slate-400" />
              <span>{colaborador.telefone_principal}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
            <span>Admitido em {formatDate(colaborador.data_admissao)}</span>
          </div>

          {colaborador.filial && (
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
              <span>{colaborador.filial.nome}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            Tipo: {colaborador.tipo_contrato?.toUpperCase()}
          </div>
          {colaborador.salario_base && (
            <div className="text-sm font-medium text-slate-700">
              R$ {colaborador.salario_base.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
