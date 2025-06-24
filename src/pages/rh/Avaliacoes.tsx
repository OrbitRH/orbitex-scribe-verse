
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function Avaliacoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
        <p className="text-gray-600">
          Sistema de avaliação de desempenho e performance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Avaliações de Desempenho
          </CardTitle>
          <CardDescription>
            Sistema integrado de avaliação de performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema de avaliações em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
