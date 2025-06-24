
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Shirt, Zap, Wrench, Package2, MoreVertical, Edit, Copy, Trash2 } from 'lucide-react';
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
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex space-x-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
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

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const Icon = typeIcons[product.tipo_produto as keyof typeof typeIcons] || Package;
          const isSelected = selectedProduct?.id === product.id;
          
          return (
            <Card
              key={product.id}
              className={`p-4 hover:shadow-md cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => onSelectProduct(product)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex items-center space-x-1">
                    {!product.situacao && (
                      <Badge variant="secondary" className="text-xs">
                        Inativo
                      </Badge>
                    )}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(product); }}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => { e.stopPropagation(); handleDelete(product); }}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 truncate">
                  {product.nome_comercial}
                </h3>
                <p className="text-sm text-gray-600">
                  Código: {product.codigo_interno}
                </p>
                
                {product.preco_sugerido_venda && (
                  <p className="text-sm font-medium text-green-600">
                    R$ {product.preco_sugerido_venda.toFixed(2)}
                  </p>
                )}

                <div className="flex flex-wrap gap-1">
                  <Badge 
                    className={`text-xs ${typeColors[product.tipo_produto as keyof typeof typeColors]}`}
                  >
                    {typeLabels[product.tipo_produto as keyof typeof typeLabels]}
                  </Badge>
                  {product.categoria && (
                    <Badge variant="outline" className="text-xs">
                      {product.categoria.nome}
                    </Badge>
                  )}
                  {product.unidade_medida && (
                    <Badge variant="outline" className="text-xs">
                      {product.unidade_medida.codigo}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
