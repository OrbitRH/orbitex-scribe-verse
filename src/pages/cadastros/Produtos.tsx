
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Package, Shirt, Zap, Wrench, Package2 } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import ProductsList from '@/components/products/ProductsList';
import ProductFilters from '@/components/products/ProductFilters';

export default function Produtos() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const tiposProduto = [
    {
      tipo: 'Matéria-Prima',
      icon: Package2,
      descricao: 'Fios, tecidos, malhas',
      color: 'bg-blue-100 text-blue-800',
      count: 0
    },
    {
      tipo: 'Produto Acabado',
      icon: Shirt,
      descricao: 'Peças prontas para venda',
      color: 'bg-green-100 text-green-800',
      count: 0
    },
    {
      tipo: 'Em Processo',
      icon: Zap,
      descricao: 'Produtos em produção',
      color: 'bg-yellow-100 text-yellow-800',
      count: 0
    },
    {
      tipo: 'Aviamento',
      icon: Wrench,
      descricao: 'Botões, zíperes, elásticos',
      color: 'bg-purple-100 text-purple-800',
      count: 0
    },
    {
      tipo: 'Serviço',
      icon: Package,
      descricao: 'Serviços industriais',
      color: 'bg-orange-100 text-orange-800',
      count: 0
    }
  ];

  const handleProductSuccess = () => {
    setSelectedProduct(null);
    // Aqui poderia recarregar lista de produtos
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header com breadcrumbs e estatísticas */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
            <span>Cadastros</span>
            <span>/</span>
            <span className="text-foreground">Produtos</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Produtos</h1>
          <p className="text-gray-600 mt-1">
            Sistema completo de cadastro para indústria têxtil com controle de grades, fichas técnicas e rastreabilidade.
          </p>
        </div>
        <Button onClick={handleNewProduct} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Overview por tipo de produto */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tiposProduto.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.tipo} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.tipo}</p>
                    <p className="text-xs text-gray-500 truncate">{item.descricao}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge className={item.color}>{item.count} itens</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Layout principal de duas colunas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Coluna esquerda - Lista de produtos */}
        <div className="lg:col-span-4 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Produtos Cadastrados</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </CardTitle>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              {showFilters && (
                <div className="mt-3">
                  <ProductFilters />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-0">
              <ProductsList
                searchTerm={searchTerm}
                selectedProduct={selectedProduct}
                onSelectProduct={handleEditProduct}
              />
            </CardContent>
          </Card>
        </div>

        {/* Coluna direita - Formulário de cadastro/edição */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                {selectedProduct ? 'Editar Produto' : 'Novo Produto'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-auto">
              <ProductForm 
                product={selectedProduct}
                onSuccess={handleProductSuccess} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
