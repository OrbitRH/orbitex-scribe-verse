
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, Building, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Cadastros() {
  const modules = [
    {
      title: 'Produtos',
      description: 'Gerencie o catálogo de produtos',
      icon: Package,
      href: '/cadastros/produtos',
      color: 'text-blue-600',
    },
    {
      title: 'Colaboradores',
      description: 'Cadastro de funcionários',
      icon: Users,
      href: '/cadastros/colaboradores',
      color: 'text-green-600',
    },
    {
      title: 'Fornecedores',
      description: 'Gestão de fornecedores',
      icon: Building,
      href: '/cadastros/fornecedores',
      color: 'text-purple-600',
    },
    {
      title: 'Clientes',
      description: 'Base de clientes',
      icon: UserCheck,
      href: '/cadastros/clientes',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cadastros</h1>
        <p className="text-gray-600">
          Gerencie todos os cadastros básicos do sistema.
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
    </div>
  );
}
