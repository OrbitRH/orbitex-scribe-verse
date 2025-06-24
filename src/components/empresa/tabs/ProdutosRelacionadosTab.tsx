
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RelatedProduct } from '../hooks/useEmpresaHistory';

interface ProdutosRelacionadosTabProps {
  products: RelatedProduct[];
  loading: boolean;
}

export function ProdutosRelacionadosTab({ products, loading }: ProdutosRelacionadosTabProps) {
  const getVariacaoIcon = (variacao: number) => {
    if (variacao > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (variacao < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getVariacaoColor = (variacao: number) => {
    if (variacao > 0) return 'text-green-600';
    if (variacao < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum produto relacionado
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Esta empresa ainda não possui produtos relacionados registrados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Produtos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {products.length} produtos com histórico de transações com esta empresa.
          </p>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base line-clamp-2">
                {product.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Último Preço</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.ultimo_preco)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Última Transação</span>
                  <span className="text-sm">
                    {new Date(product.ultima_compra).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Transações</span>
                  <Badge variant="outline">
                    {product.total_transacoes}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Variação de Preço</span>
                  <div className={`flex items-center gap-1 ${getVariacaoColor(product.variacao_preco)}`}>
                    {getVariacaoIcon(product.variacao_preco)}
                    <span className="text-sm font-medium">
                      {product.variacao_preco > 0 ? '+' : ''}{product.variacao_preco.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
