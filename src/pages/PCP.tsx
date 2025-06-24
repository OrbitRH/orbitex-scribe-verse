
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Calendar, Target, Activity } from 'lucide-react';

export default function PCP() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">PCP - Planejamento e Controle da Produção</h1>
        <p className="text-gray-600">
          Gerencie o planejamento e controle dos processos produtivos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              Planejamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Organize a programação da produção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Controle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Monitore o progresso da produção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Activity className="h-4 w-4 mr-2 text-purple-600" />
              Indicadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Acompanhe métricas de desempenho
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Sistema PCP
          </CardTitle>
          <CardDescription>
            Módulo de Planejamento e Controle da Produção.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema PCP em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
