
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface ConveniosEmptyStateProps {
  searchTerm: string;
}

export function ConveniosEmptyState({ searchTerm }: ConveniosEmptyStateProps) {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">
          {searchTerm ? 'Nenhum convênio encontrado' : 'Nenhum convênio cadastrado'}
        </p>
      </CardContent>
    </Card>
  );
}
