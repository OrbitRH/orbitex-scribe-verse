
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Package, Shirt, Zap, Wrench, Package2 } from 'lucide-react';
import { useState } from 'react';
import ProductForm from '@/components/products/ProductForm';

export default function Produtos() {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setDialogOpen(false);
    // Aqui poderia recarregar lista de produtos se existisse
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">
            Sistema completo de cadastro para indústria têxtil com controle de grades, fichas técnicas e rastreabilidade.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <ProductForm onSuccess={handleProductSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview por tipo de produto */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tiposProduto.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.tipo}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.tipo}</p>
                    <p className="text-xs text-gray-500">{item.descricao}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Badge className={item.color}>{item.count} itens</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Funcionalidades principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Controle de Produtos
            </CardTitle>
            <CardDescription>
              Cadastro com informações técnicas e comerciais completas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">• Informações básicas e técnicas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Classificação NCM e CFOP</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Controle por grade (tamanho/cor)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Controle de lotes e validade</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shirt className="h-5 w-5 mr-2" />
              Fichas Técnicas (BOM)
            </CardTitle>
            <CardDescription>
              Estrutura de materiais para produtos compostos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">• Lista de componentes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Quantidades e perdas técnicas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Custo de transformação</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">• Tempo de produção</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Lista de Produtos
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os produtos cadastrados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Clique em "Novo Produto" para começar o cadastro completo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
