
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function Ponto() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Controle de Ponto</h1>
        <p className="text-gray-600">
          Sistema de controle de ponto eletrônico e gestão de horários.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Controle de Ponto
          </CardTitle>
          <CardDescription>
            Sistema de ponto eletrônico integrado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema de ponto em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
