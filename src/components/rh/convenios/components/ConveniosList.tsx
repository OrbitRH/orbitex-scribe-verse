
import React from 'react';
import { Convenio } from '../types/ConvenioTypes';
import { ConvenioCard } from './ConvenioCard';
import { ConveniosEmptyState } from './ConveniosEmptyState';

interface ConveniosListProps {
  convenios: Convenio[];
  loading: boolean;
  searchTerm: string;
  onEdit: (convenio: Convenio) => void;
  onDelete: (id: string) => void;
}

export function ConveniosList({ convenios, loading, searchTerm, onEdit, onDelete }: ConveniosListProps) {
  if (loading) {
    return <div className="text-center py-8">Carregando convênios...</div>;
  }

  if (convenios.length === 0) {
    return <ConveniosEmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="grid gap-4">
      {convenios.map((convenio) => (
        <ConvenioCard
          key={convenio.id}
          convenio={convenio}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
