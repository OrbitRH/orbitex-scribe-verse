
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload, Eye, Trash2 } from 'lucide-react';

interface DocumentosSectionProps {
  form: UseFormReturn<any>;
}

export function DocumentosSection({ form }: DocumentosSectionProps) {
  const documentos = [
    { id: 'ctps', label: 'Carteira de Trabalho (CTPS)', required: true },
    { id: 'pis', label: 'PIS/PASEP', required: true },
    { id: 'titulo_eleitor', label: 'Título de Eleitor', required: false },
    { id: 'cert_reservista', label: 'Certificado de Reservista', required: false },
    { id: 'cert_nascimento', label: 'Certidão de Nascimento/Casamento', required: false },
    { id: 'comprovante_residencia', label: 'Comprovante de Residência', required: true },
    { id: 'foto_3x4', label: 'Foto 3x4', required: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentos Necessários
        </h3>
        
        <div className="grid gap-4">
          {documentos.map((doc) => (
            <Card key={doc.id} className="bg-slate-50/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium text-slate-700">
                      {doc.label}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <p className="text-sm text-slate-500 mt-1">
                      Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id={`doc-${doc.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`doc-${doc.id}`)?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Button type="button" variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm" disabled>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Importante:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Todos os documentos marcados com * são obrigatórios</li>
            <li>• Os arquivos devem estar legíveis e em boa qualidade</li>
            <li>• Certifique-se de que as informações estão atualizadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
