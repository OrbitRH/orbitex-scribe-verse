
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Shirt, Zap, Wrench, Package2, MoreVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
  id: string;
  nome_comercial: string;
  codigo_interno: string;
  tipo_produto: string;
  situacao: boolean;
  categoria?: {
    nome: string;
  };
  unidade_medida?: {
    codigo: string;
  };
}

interface ProductsListProps {
  searchTerm: string;
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

const typeIcons = {
  materia_prima: Package2,
  produto_acabado: Shirt,
  em_processo: Zap,
  aviamento: Wrench,
  servico: Package,
};

const typeLabels = {
  materia_prima: 'Matéria-Prima',
  produto_acabado: 'Produto Acabado',
  em_processo: 'Em Processo',
  aviamento: 'Aviamento',
  servico: 'Serviço',
};

const typeColors = {
  materia_prima: 'bg-blue-100 text-blue-800',
  produto_acabado: 'bg-green-100 text-green-800',
  em_processo: 'bg-yellow-100 text-yellow-800',
  aviamento: 'bg-purple-100 text-purple-800',
  servico: 'bg-orange-100 text-orange-800',
};

export default function ProductsList({ searchTerm, selectedProduct, onSelectProduct }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('produtos')
        .select(`
          id,
          nome_comercial,
          codigo_interno,
          tipo_produto,
          situacao,
          categoria:categorias_produtos(nome),
          unidade_medida:unidades_medida(codigo)
        `)
        .order('nome_comercial');

      if (searchTerm) {
        query = query.or(`nome_comercial.ilike.%${searchTerm}%,codigo_interno.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Erro ao buscar produtos:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = (product: Product) => {
    // Implementar duplicação de produto
    console.log('Duplicar produto:', product.id);
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.nome_comercial}"?`)) {
      try {
        const { error } = await supabase
          .from('produtos')
          .delete()
          .eq('id', product.id);

        if (error) throw error;
        
        fetchProducts();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 mb-2">
          {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado ainda.'}
        </p>
        <p className="text-sm text-gray-400">
          {searchTerm 
            ? 'Tente ajustar os termos de busca'
            : 'Clique em "Novo Produto" para começar o cadastro.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {products.map((product) => {
        const Icon = typeIcons[product.tipo_produto as keyof typeof typeIcons] || Package;
        const isSelected = selectedProduct?.id === product.id;
        
        return (
          <div
            key={product.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              isSelected ? 'bg-blue-50 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => onSelectProduct(product)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.nome_comercial}
                    </h3>
                    {!product.situacao && (
                      <Badge variant="secondary" className="text-xs">
                        Inativo
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Código: {product.codigo_interno}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`text-xs ${typeColors[product.tipo_produto as keyof typeof typeColors]}`}
                    >
                      {typeLabels[product.tipo_produto as keyof typeof typeLabels]}
                    </Badge>
                    {product.categoria && (
                      <span className="text-xs text-gray-500">
                        {product.categoria.nome}
                      </span>
                    )}
                    {product.unidade_medida && (
                      <span className="text-xs text-gray-500">
                        {product.unidade_medida.codigo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onSelectProduct(product)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(product)}
                    className="text-red-600"
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
}
