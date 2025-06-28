
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';

interface BeneficiosEmptyStateProps {
  searchTerm: string;
}

export function BeneficiosEmptyState({ searchTerm }: BeneficiosEmptyStateProps) {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">
          {searchTerm ? 'Nenhum benefício encontrado' : 'Nenhum benefício cadastrado'}
        </p>
      </CardContent>
    </Card>
  );
}
