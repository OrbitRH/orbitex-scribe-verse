
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Tarefas() {
  const stats = [
    {
      title: 'Pendentes',
      value: '0',
      description: 'Tarefas aguardando',
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Em Andamento',
      value: '0',
      description: 'Tarefas em execução',
      icon: AlertCircle,
      color: 'text-blue-600',
    },
    {
      title: 'Concluídas',
      value: '0',
      description: 'Tarefas finalizadas',
      icon: CheckCircle,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
          <p className="text-gray-600">
            Gerencie e acompanhe as tarefas da equipe.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
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
            <Clock className="h-5 w-5 mr-2" />
            Lista de Tarefas
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todas as tarefas em andamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhuma tarefa cadastrada ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Clique em "Nova Tarefa" para começar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
