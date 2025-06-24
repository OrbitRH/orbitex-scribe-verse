import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Building, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmpresasListProps {
  searchTerm: string;
  filterType: string;
  onView: (empresa: any) => void;
  onEdit: (empresa: any) => void;
  onDelete: (empresa: any) => void;
}

export function EmpresasList({ searchTerm, filterType, onView, onEdit, onDelete }: EmpresasListProps) {
  // Dados mockados para demonstração
  const empresas = [
    {
      id: '1',
      razao_social: 'Empresa ABC Ltda',
      nome_fantasia: 'ABC Textil',
      cnpj: '12.345.678/0001-99',
      tipo_empresa: 'cliente',
      situacao: 'ativo',
      email: 'contato@abctextil.com.br',
      telefone: '(11) 1234-5678',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    {
      id: '2',
      razao_social: 'Fornecedor XYZ S.A.',
      nome_fantasia: 'XYZ Tecidos',
      cnpj: '98.765.432/0001-11',
      tipo_empresa: 'fornecedor',
      situacao: 'ativo',
      email: 'vendas@xyztecidos.com.br',
      telefone: '(11) 9876-5432',
      cidade: 'Campinas',
      estado: 'SP'
    }
  ];

  const filteredEmpresas = empresas.filter(empresa => {
    const matchesSearch = 
      empresa.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm);
    
    const matchesFilter = filterType === 'todos' || empresa.tipo_empresa === filterType;
    
    return matchesSearch && matchesFilter;
  });

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

  if (filteredEmpresas.length === 0) {
    return (
      <div className="text-center py-8">
        <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">
          {searchTerm || filterType !== 'todos' 
            ? 'Nenhuma empresa encontrada com os filtros aplicados.' 
            : 'Nenhuma empresa cadastrada ainda.'
          }
        </p>
        {!searchTerm && filterType === 'todos' && (
          <p className="text-sm text-gray-400 mt-2">
            Clique em "Nova Empresa" para começar.
          </p>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmpresas.map((empresa) => (
              <TableRow key={empresa.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{empresa.razao_social}</div>
                    <div className="text-sm text-muted-foreground">{empresa.nome_fantasia}</div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{empresa.cnpj}</TableCell>
                <TableCell>{getTipoEmpresaBadge(empresa.tipo_empresa)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{empresa.email}</div>
                    <div className="text-muted-foreground">{empresa.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {empresa.cidade} - {empresa.estado}
                  </div>
                </TableCell>
                <TableCell>{getSituacaoBadge(empresa.situacao)}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <div className="flex justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onView(empresa)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visualizar empresa</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onEdit(empresa)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar empresa</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDelete(empresa)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Inativar empresa</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
