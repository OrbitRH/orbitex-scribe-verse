
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Package, Shirt, Zap, Wrench, Package2 } from 'lucide-react';
import ProductActions from './ProductActions';

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

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onDelete: (product: Product) => void;
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

export default function ProductCard({ 
  product, 
  isSelected, 
  onSelect, 
  onDuplicate, 
  onDelete 
}: ProductCardProps) {
  const Icon = typeIcons[product.tipo_produto as keyof typeof typeIcons] || Package;

  return (
    <Card
      className={`p-4 hover:shadow-md cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}
      onClick={() => onSelect(product)}
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
        
        <ProductActions
          product={product}
          onEdit={onSelect}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
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
}
