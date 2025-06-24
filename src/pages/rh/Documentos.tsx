
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Documentos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentos RH</h1>
        <p className="text-gray-600">
          Gestão de documentos e arquivo de recursos humanos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Documentos RH
          </CardTitle>
          <CardDescription>
            Arquivo digital de documentos dos colaboradores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema de documentos em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
