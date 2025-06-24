
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, Shield, Database, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">
          Configurações gerais do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Empresa
            </CardTitle>
            <CardDescription>
              Configurações da empresa, filiais, usuários e permissões.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Gerencie dados da empresa, filiais, usuários e sistema de permissões.
            </p>
            <Link to="/configuracoes/empresa">
              <Button className="w-full">
                Acessar Configurações da Empresa
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Usuários e Permissões
            </CardTitle>
            <CardDescription>
              Gerencie usuários e suas permissões no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure quem pode acessar cada módulo do sistema.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Defina políticas de senha e autenticação.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-600" />
              Backup
            </CardTitle>
            <CardDescription>
              Configurações de backup e restauração.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure backups automáticos dos dados.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-orange-600" />
              Sistema
            </CardTitle>
            <CardDescription>
              Configurações gerais do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configurações avançadas e parâmetros do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
