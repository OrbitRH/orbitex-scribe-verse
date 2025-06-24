
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface EmpresaModalHeaderProps {
  empresa: any;
  onEdit: () => void;
}

export function EmpresaModalHeader({ empresa, onEdit }: EmpresaModalHeaderProps) {
  const getTipoEmpresaBadge = (tipo: string) => {
    const variants = {
      cliente: 'default',
      fornecedor: 'secondary',
      ambos: 'outline'
    } as const;

    const labels = {
      cliente: 'Cliente',
      fornecedor: 'Fornecedor',
      ambos: 'Cliente/Fornecedor'
    };

    return (
      <Badge variant={variants[tipo as keyof typeof variants]}>
        {labels[tipo as keyof typeof labels]}
      </Badge>
    );
  };

  const getSituacaoBadge = (situacao: string) => {
    return (
      <Badge variant={situacao === 'ativo' ? 'default' : 'destructive'}>
        {situacao === 'ativo' ? 'Ativo' : 'Inativo'}
      </Badge>
    );
  };

  return (
    <DialogHeader className="flex-shrink-0 pb-4 border-b border-slate-200/50">
      <div className="flex items-center justify-between">
        <div>
          <DialogTitle className="flex items-center gap-3 text-slate-800">
            {empresa.razao_social}
            {getTipoEmpresaBadge(empresa.tipo_empresa)}
            {getSituacaoBadge(empresa.situacao)}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {empresa.nome_fantasia && `${empresa.nome_fantasia} • `}
            {empresa.cnpj}
          </DialogDescription>
        </div>
        <Button onClick={onEdit} size="sm" className="bg-slate-700 hover:bg-slate-800">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>
    </DialogHeader>
  );
}
