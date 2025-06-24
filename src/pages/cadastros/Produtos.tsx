
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

export default function Produtos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">
            Gerencie o catálogo de produtos da empresa.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Lista de Produtos
          </CardTitle>
          <CardDescription>
            Aqui você pode visualizar e gerenciar todos os produtos cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Clique em "Novo Produto" para começar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
