
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Trash2, Eye } from 'lucide-react';
import { EmpresaFormData } from '../hooks/useEmpresaForm';

interface EmpresaDocumentosTabProps {
  form: UseFormReturn<EmpresaFormData>;
}

export function EmpresaDocumentosTab({ form }: EmpresaDocumentosTabProps) {
  // Dados mockados para demonstração
  const documentos = [
    {
      id: '1',
      nome: 'Cartão CNPJ.pdf',
      tipo: 'cnpj',
      tamanho: '245 KB',
      dataUpload: '2024-01-15',
    },
    {
      id: '2',
      nome: 'Contrato Social.pdf',
      tipo: 'contrato',
      tamanho: '1.2 MB',
      dataUpload: '2024-01-15',
    }
  ];

  const tiposDocumento = [
    { value: 'cnpj', label: 'Cartão CNPJ' },
    { value: 'contrato', label: 'Contrato Social' },
    { value: 'certidao', label: 'Certidão Negativa' },
    { value: 'alvara', label: 'Alvará' },
    { value: 'certificacao', label: 'Certificação' },
    { value: 'rg', label: 'RG do Responsável' },
    { value: 'cpf', label: 'CPF do Responsável' },
    { value: 'outros', label: 'Outros' },
  ];

  const getTipoDocumentoBadge = (tipo: string) => {
    const tipoDoc = tiposDocumento.find(t => t.value === tipo);
    return (
      <Badge variant="outline">
        {tipoDoc?.label || 'Outros'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload de Documentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Arraste e solte os arquivos aqui ou clique para selecionar
            </p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Arquivos
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados</CardTitle>
        </CardHeader>
        <CardContent>
          {documentos.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhum documento anexado ainda.</p>
              <p className="text-sm text-gray-400 mt-2">
                Use o upload acima para adicionar documentos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">{doc.nome}</div>
                      <div className="text-sm text-gray-500">
                        {doc.tamanho} • Enviado em {new Date(doc.dataUpload).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    {getTipoDocumentoBadge(doc.tipo)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Recomendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Documentos Essenciais</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cartão CNPJ (obrigatório para PJ)</li>
              <li>• Contrato Social ou alterações</li>
              <li>• Certidões negativas (recomendado)</li>
              <li>• RG/CPF do responsável</li>
              <li>• Alvarás e certificações (quando aplicável)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
