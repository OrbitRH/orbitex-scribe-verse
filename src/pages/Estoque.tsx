
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Warehouse, Package, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Estoque() {
  const stats = [
    {
      title: 'Total de Itens',
      value: '0',
      description: 'Produtos em estoque',
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Estoque Baixo',
      value: '0',
      description: 'Itens com pouco estoque',
      icon: AlertTriangle,
      color: 'text-yellow-600',
    },
    {
      title: 'Movimentações',
      value: '0',
      description: 'Hoje',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
        <p className="text-gray-600">
          Controle e monitoramento do estoque da empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Warehouse className="h-5 w-5 mr-2" />
            Controle de Estoque
          </CardTitle>
          <CardDescription>
            Visualize e gerencie os níveis de estoque dos produtos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Warehouse className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema de estoque em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
