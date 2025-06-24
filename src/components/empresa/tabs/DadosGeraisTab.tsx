
import React, { useState } from 'react';
import { ModernCard } from '../components/ModernCard';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Phone, Mail, Building2, Hash } from 'lucide-react';

interface DadosGeraisTabProps {
  empresa: any;
}

export function DadosGeraisTab({ empresa }: DadosGeraisTabProps) {
  const [expandedSections, setExpandedSections] = useState({
    identificacao: true,
    contato: true,
    endereco: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
      <Badge variant={variants[tipo as keyof typeof variants]} className="ml-2">
        {labels[tipo as keyof typeof labels]}
      </Badge>
    );
  };

  const getSituacaoBadge = (situacao: string) => {
    return (
      <Badge 
        variant={situacao === 'ativo' ? 'default' : 'destructive'}
        className="ml-2"
      >
        {situacao === 'ativo' ? 'Ativo' : 'Inativo'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identificação */}
        <ModernCard 
          className="lg:col-span-2"
          icon={<Building2 className="h-5 w-5 text-slate-600" />}
        >
          <SectionHeader
            title="Identificação"
            subtitle="Informações básicas da empresa"
            isCollapsible
            isExpanded={expandedSections.identificacao}
            onToggle={() => toggleSection('identificacao')}
            icon={<User className="h-4 w-4 text-slate-600" />}
          />
          
          {expandedSections.identificacao && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Razão Social
                </label>
                <p className="text-sm text-slate-800 font-medium">
                  {empresa.razao_social}
                  {getTipoEmpresaBadge(empresa.tipo_empresa)}
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Nome Fantasia</label>
                <p className="text-sm text-slate-800">{empresa.nome_fantasia || '-'}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  CNPJ
                </label>
                <p className="text-sm text-slate-800 font-mono">{empresa.cnpj}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Situação</label>
                <div className="flex items-center">
                  <span className="text-sm text-slate-800">
                    {empresa.situacao === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                  {getSituacaoBadge(empresa.situacao)}
                </div>
              </div>
            </div>
          )}
        </ModernCard>

        {/* Contato */}
        <ModernCard icon={<Phone className="h-5 w-5 text-slate-600" />}>
          <SectionHeader
            title="Contato"
            subtitle="Informações de comunicação"
            isCollapsible
            isExpanded={expandedSections.contato}
            onToggle={() => toggleSection('contato')}
            icon={<Mail className="h-4 w-4 text-slate-600" />}
          />
          
          {expandedSections.contato && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  E-mail
                </label>
                <p className="text-sm text-slate-800">{empresa.email || '-'}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Telefone
                </label>
                <p className="text-sm text-slate-800">{empresa.telefone || '-'}</p>
              </div>
            </div>
          )}
        </ModernCard>

        {/* Endereço */}
        <ModernCard icon={<MapPin className="h-5 w-5 text-slate-600" />}>
          <SectionHeader
            title="Endereço"
            subtitle="Localização da empresa"
            isCollapsible
            isExpanded={expandedSections.endereco}
            onToggle={() => toggleSection('endereco')}
            icon={<MapPin className="h-4 w-4 text-slate-600" />}
          />
          
          {expandedSections.endereco && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Cidade</label>
                <p className="text-sm text-slate-800">{empresa.cidade || '-'}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Estado</label>
                <p className="text-sm text-slate-800">{empresa.estado || '-'}</p>
              </div>
            </div>
          )}
        </ModernCard>
      </div>
    </div>
  );
}
