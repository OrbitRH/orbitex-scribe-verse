
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, Clock, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { profile, userRoles } = useAuth();

  const stats = [
    {
      title: 'Produtos Cadastrados',
      value: '0',
      description: 'Total de produtos',
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Colaboradores Ativos',
      value: '0',
      description: 'Funcionários cadastrados',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Tarefas Pendentes',
      value: '0',
      description: 'Aguardando execução',
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 0,00',
      description: 'Mês atual',
      icon: DollarSign,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {profile?.full_name || 'Usuário'}!
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo das principais informações do sistema.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Suas Permissões</CardTitle>
            <CardDescription>
              Módulos que você tem acesso no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <span
                  key={role}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Nenhuma atividade recente encontrada.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
