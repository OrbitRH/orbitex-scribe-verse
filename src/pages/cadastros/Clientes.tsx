
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UserCheck } from 'lucide-react';

export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">
            Gerencie a base de clientes da empresa.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Lista de Clientes
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os clientes cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum cliente cadastrado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Clique em "Novo Cliente" para começar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
