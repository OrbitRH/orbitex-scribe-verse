
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Cadastros() {
  const modules = [
    {
      title: 'Produtos',
      description: 'Cadastro completo para indústria têxtil',
      icon: Package,
      href: '/cadastros/produtos',
      color: 'text-blue-600',
    },
    {
      title: 'Empresas',
      description: 'Clientes, fornecedores e parceiros',
      icon: Building,
      href: '/cadastros/empresas',
      color: 'text-green-600',
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
