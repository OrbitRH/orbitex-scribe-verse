
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building } from 'lucide-react';

export default function Fornecedores() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600">
            Gerencie o cadastro de fornecedores da empresa.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Lista de Fornecedores
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os fornecedores cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum fornecedor cadastrado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Clique em "Novo Fornecedor" para começar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
