
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from './ProductCard';
import ProductsEmptyState from './ProductsEmptyState';
import ProductsLoadingState from './ProductsLoadingState';

interface Product {
  id: string;
  nome_comercial: string;
  codigo_interno: string;
  tipo_produto: string;
  situacao: boolean;
  preco_sugerido_venda?: number;
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
          preco_sugerido_venda,
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
    return <ProductsLoadingState />;
  }

  if (products.length === 0) {
    return <ProductsEmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProduct?.id === product.id}
            onSelect={onSelectProduct}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
