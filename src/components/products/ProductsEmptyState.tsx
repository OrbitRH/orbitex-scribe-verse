
import { Package } from 'lucide-react';

interface ProductsEmptyStateProps {
  searchTerm: string;
}

export default function ProductsEmptyState({ searchTerm }: ProductsEmptyStateProps) {
  return (
    <div className="p-8 text-center">
      <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado ainda.'}
      </h3>
      <p className="text-gray-500 mb-4">
        {searchTerm 
          ? 'Tente ajustar os termos de busca ou limpar os filtros'
          : 'Comece criando seu primeiro produto clicando no botão "Novo Produto" acima.'
        }
      </p>
    </div>
  );
}
