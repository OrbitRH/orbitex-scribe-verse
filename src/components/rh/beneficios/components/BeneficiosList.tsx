
import React from 'react';
import { TipoBeneficio } from '../types/BeneficioTypes';
import { BeneficioCard } from './BeneficioCard';
import { BeneficiosEmptyState } from './BeneficiosEmptyState';

interface BeneficiosListProps {
  beneficios: TipoBeneficio[];
  loading: boolean;
  searchTerm: string;
  onEdit: (beneficio: TipoBeneficio) => void;
  onDelete: (id: string) => void;
}

export function BeneficiosList({ beneficios, loading, searchTerm, onEdit, onDelete }: BeneficiosListProps) {
  if (loading) {
    return <div className="text-center py-8">Carregando benefícios...</div>;
  }

  if (beneficios.length === 0) {
    return <BeneficiosEmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="grid gap-4">
      {beneficios.map((beneficio) => (
        <BeneficioCard
          key={beneficio.id}
          beneficio={beneficio}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
