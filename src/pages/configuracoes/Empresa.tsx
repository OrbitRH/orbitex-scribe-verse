
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Shield, Settings } from 'lucide-react';
import { DadosEmpresaTab } from '@/components/empresa/tabs/DadosEmpresaTab';
import { FiliaisTab } from '@/components/empresa/tabs/FiliaisTab';
import { UsuariosTab } from '@/components/empresa/tabs/UsuariosTab';
import { PermissoesTab } from '@/components/empresa/tabs/PermissoesTab';

export default function Empresa() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações da Empresa</h1>
        <p className="text-gray-600">
          Gerencie todas as configurações relacionadas à empresa, filiais, usuários e permissões.
        </p>
      </div>

      <Tabs defaultValue="dados" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dados" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Dados da Empresa
          </TabsTrigger>
          <TabsTrigger value="filiais" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Filiais
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissões
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Configure as informações básicas da empresa, dados fiscais e parâmetros do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DadosEmpresaTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filiais">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Filiais</CardTitle>
              <CardDescription>
                Cadastre e gerencie múltiplas filiais e unidades da empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FiliaisTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Usuários</CardTitle>
              <CardDescription>
                Gerencie usuários do sistema e suas associações com filiais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsuariosTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes">
          <Card>
            <CardHeader>
              <CardTitle>Roles e Permissões</CardTitle>
              <CardDescription>
                Configure roles customizados e permissões granulares do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PermissoesTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
