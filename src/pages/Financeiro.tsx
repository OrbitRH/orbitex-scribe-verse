
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

export default function Financeiro() {
  const stats = [
    {
      title: 'Receitas',
      value: 'R$ 0,00',
      description: 'Este mês',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Despesas',
      value: 'R$ 0,00',
      description: 'Este mês',
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Saldo',
      value: 'R$ 0,00',
      description: 'Disponível',
      icon: DollarSign,
      color: 'text-blue-600',
    },
    {
      title: 'A Receber',
      value: 'R$ 0,00',
      description: 'Pendente',
      icon: CreditCard,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
        <p className="text-gray-600">
          Controle financeiro completo da empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <DollarSign className="h-5 w-5 mr-2" />
            Controle Financeiro
          </CardTitle>
          <CardDescription>
            Visão completa da situação financeira da empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema financeiro em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
