
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Package, Shirt, Zap, Wrench, Package2, ChevronRight } from 'lucide-react';
import ProductFormModal from '@/components/products/ProductFormModal';
import ProductsList from '@/components/products/ProductsList';
import ProductFilters from '@/components/products/ProductFilters';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';

export default function Produtos() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const tiposProduto = [
    {
      tipo: 'Matéria-Prima',
      icon: Package2,
      descricao: 'Fios, tecidos, malhas',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50/80',
      count: 0
    },
    {
      tipo: 'Produto Acabado',
      icon: Shirt,
      descricao: 'Peças prontas para venda',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50/80',
      count: 0
    },
    {
      tipo: 'Em Processo',
      icon: Zap,
      descricao: 'Produtos em produção',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50/80',
      count: 0
    },
    {
      tipo: 'Aviamento',
      icon: Wrench,
      descricao: 'Botões, zíperes, elásticos',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50/80',
      count: 0
    },
    {
      tipo: 'Serviço',
      icon: Package,
      descricao: 'Serviços industriais',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50/80',
      count: 0
    }
  ];

  const handleProductSuccess = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(false);
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40">
      <div className="flex flex-col h-full space-y-6 p-6">
        {/* Header com breadcrumbs e CTA */}
        <div className="flex items-center justify-between">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
              <span>Cadastros</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-800 font-medium">Produtos</span>
            </div>
            
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Gestão de Produtos
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Sistema completo de cadastro para indústria têxtil com controle de grades, 
                fichas técnicas e rastreabilidade de processos.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleNewProduct} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 shrink-0"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Overview por tipo de produto */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tiposProduto.map((item) => {
            const Icon = item.icon;
            return (
              <GlassmorphicCard 
                key={item.tipo} 
                className="p-0 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-5">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-xl ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`h-6 w-6 ${item.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.tipo}</p>
                      <p className="text-xs text-slate-600 truncate">{item.descricao}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`${item.bgColor} ${item.textColor} border-0 font-medium`}>
                      {item.count} itens
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              </GlassmorphicCard>
            );
          })}
        </div>

        {/* Lista de produtos expandida */}
        <div className="flex-1 min-h-0">
          <GlassmorphicCard variant="elevated" className="h-full flex flex-col">
            {/* Header da Lista */}
            <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-white/90 to-slate-50/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Produtos Cadastrados</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Gerencie todos os produtos da sua empresa
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white/80 border-slate-200/60 hover:bg-white/90"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar produtos por nome, código ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-slate-200/60 focus:border-blue-400/60 focus:ring-blue-400/20"
                />
              </div>
              
              {/* Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white/60 rounded-xl border border-slate-200/60">
                  <ProductFilters />
                </div>
              )}
            </div>
            
            {/* Products List */}
            <div className="flex-1 min-h-0 bg-gradient-to-br from-white/50 to-slate-50/30">
              <ProductsList
                searchTerm={searchTerm}
                selectedProduct={selectedProduct}
                onSelectProduct={handleEditProduct}
              />
            </div>
          </GlassmorphicCard>
        </div>

        {/* Modal do formulário */}
        <ProductFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSuccess={handleProductSuccess}
        />
      </div>
    </div>
  );
}
