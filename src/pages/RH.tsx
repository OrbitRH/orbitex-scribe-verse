
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, Award } from 'lucide-react';

export default function RH() {
  const modules = [
    {
      title: 'Funcionários',
      description: 'Gestão de pessoal',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Ponto',
      description: 'Controle de ponto',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'Documentos',
      description: 'Documentação RH',
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      title: 'Avaliações',
      description: 'Performance',
      icon: Award,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recursos Humanos</h1>
        <p className="text-gray-600">
          Gerencie todos os aspectos relacionados aos recursos humanos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {module.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${module.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {module.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Sistema RH
          </CardTitle>
          <CardDescription>
            Módulo completo de gestão de recursos humanos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema RH em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
