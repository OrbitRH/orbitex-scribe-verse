
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, PieChart, TrendingUp } from 'lucide-react';

export default function Relatorios() {
  const reports = [
    {
      title: 'Vendas',
      description: 'Relatórios de vendas',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Financeiro',
      description: 'Relatórios financeiros',
      icon: BarChart3,
      color: 'text-blue-600',
    },
    {
      title: 'Estoque',
      description: 'Relatórios de estoque',
      icon: PieChart,
      color: 'text-purple-600',
    },
    {
      title: 'Geral',
      description: 'Relatórios gerais',
      icon: FileText,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">
          Centro de relatórios e análises do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {report.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${report.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {report.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Central de Relatórios
          </CardTitle>
          <CardDescription>
            Acesse todos os relatórios disponíveis no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema de relatórios em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
