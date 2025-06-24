
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function RH() {
  const modules = [
    {
      title: 'Colaboradores',
      description: 'Gestão de pessoal',
      icon: Users,
      href: '/rh/colaboradores',
      color: 'text-blue-600',
    },
    {
      title: 'Ponto',
      description: 'Controle de ponto',
      icon: Calendar,
      href: '/rh/ponto',
      color: 'text-green-600',
    },
    {
      title: 'Documentos',
      description: 'Documentação RH',
      icon: FileText,
      href: '/rh/documentos',
      color: 'text-purple-600',
    },
    {
      title: 'Avaliações',
      description: 'Performance',
      icon: Award,
      href: '/rh/avaliacoes',
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
            <Card key={module.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {module.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${module.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  {module.description}
                </p>
                <Link to={module.href}>
                  <Button size="sm" className="w-full">
                    Acessar
                  </Button>
                </Link>
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
            Módulo completo de gestão de recursos humanos integrado ao sistema OrbiTex.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Principais Funcionalidades:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cadastro completo de colaboradores</li>
                <li>• Controle de ponto eletrônico</li>
                <li>• Gestão de documentos pessoais</li>
                <li>• Sistema de avaliação de desempenho</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Integrações:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Folha de pagamento</li>
                <li>• Controle de custos por centro</li>
                <li>• Relatórios gerenciais</li>
                <li>• Conformidade trabalhista</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
