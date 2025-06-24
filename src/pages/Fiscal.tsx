
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calculator, Receipt, AlertTriangle } from 'lucide-react';

export default function Fiscal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fiscal</h1>
        <p className="text-gray-600">
          Gestão fiscal e tributária da empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-blue-600" />
              Notas Fiscais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Emissão e controle de NF
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Calculator className="h-4 w-4 mr-2 text-green-600" />
              Impostos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Cálculo de impostos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Receipt className="h-4 w-4 mr-2 text-purple-600" />
              Declarações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Declarações fiscais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Prazos e obrigações
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Sistema Fiscal
          </CardTitle>
          <CardDescription>
            Controle completo das obrigações fiscais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Sistema fiscal em desenvolvimento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
