
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Target, Users, BarChart3 } from 'lucide-react';

export default function Comercial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comercial</h1>
        <p className="text-gray-600">
          Gestão comercial e vendas da empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <ShoppingCart className="h-4 w-4 mr-2 text-blue-600" />
              Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Controle de pedidos e vendas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Metas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Acompanhamento de metas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-purple-600" />
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Gestão de relacionamento
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Dashboard Comercial
          </CardTitle>
          <CardDescription>
            Visão geral das atividades comerciais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema comercial em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
