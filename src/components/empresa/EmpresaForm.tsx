
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Save, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEmpresaForm } from './hooks/useEmpresaForm';
import { EmpresaIdentificacaoTab } from './tabs/EmpresaIdentificacaoTab';
import { EmpresaClassificacaoTab } from './tabs/EmpresaClassificacaoTab';
import { EmpresaContatoTab } from './tabs/EmpresaContatoTab';
import { EmpresaEnderecoTab } from './tabs/EmpresaEnderecoTab';
import { EmpresaFinanceiroTab } from './tabs/EmpresaFinanceiroTab';
import { EmpresaFiscalTab } from './tabs/EmpresaFiscalTab';
import { EmpresaDocumentosTab } from './tabs/EmpresaDocumentosTab';

interface EmpresaFormProps {
  empresa?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EmpresaForm({ empresa, onSuccess, onCancel }: EmpresaFormProps) {
  const [activeTab, setActiveTab] = useState('identificacao');
  const { form, loading, onSubmit, completedTabs } = useEmpresaForm(onSuccess, empresa);

  const tabs = [
    { id: 'identificacao', title: 'Identificação', required: true },
    { id: 'classificacao', title: 'Classificação', required: true },
    { id: 'contato', title: 'Contato', required: true },
    { id: 'endereco', title: 'Endereço', required: true },
    { id: 'financeiro', title: 'Financeiro', required: false },
    { id: 'fiscal', title: 'Fiscal', required: false },
    { id: 'documentos', title: 'Documentos', required: false },
  ];

  const calculateProgress = () => {
    const requiredTabs = tabs.filter(t => t.required);
    const completedRequired = requiredTabs.filter(t => completedTabs.includes(t.id));
    const optionalCompleted = tabs.filter(t => !t.required && completedTabs.includes(t.id));
    
    const baseProgress = (completedRequired.length / requiredTabs.length) * 70;
    const bonusProgress = (optionalCompleted.length / (tabs.length - requiredTabs.length)) * 30;
    
    return Math.round(baseProgress + bonusProgress);
  };

  const isFormValid = () => {
    const requiredTabs = tabs.filter(t => t.required);
    return requiredTabs.every(t => completedTabs.includes(t.id));
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {empresa ? 'Editando Empresa' : 'Nova Empresa'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete as informações para cadastrar a empresa no sistema
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{calculateProgress()}% completo</div>
            <div className="text-xs text-muted-foreground">
              {completedTabs.length} de {tabs.length} abas
            </div>
          </div>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-xs"
                  disabled={loading}
                >
                  {tab.title}
                  {tab.required && <span className="text-red-500 ml-1">*</span>}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="identificacao">
              <EmpresaIdentificacaoTab form={form} />
            </TabsContent>

            <TabsContent value="classificacao">
              <EmpresaClassificacaoTab form={form} />
            </TabsContent>

            <TabsContent value="contato">
              <EmpresaContatoTab form={form} />
            </TabsContent>

            <TabsContent value="endereco">
              <EmpresaEnderecoTab form={form} />
            </TabsContent>

            <TabsContent value="financeiro">
              <EmpresaFinanceiroTab form={form} />
            </TabsContent>

            <TabsContent value="fiscal">
              <EmpresaFiscalTab form={form} />
            </TabsContent>

            <TabsContent value="documentos">
              <EmpresaDocumentosTab form={form} />
            </TabsContent>
          </Tabs>

          {/* Action Bar */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={loading}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Resetar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {isFormValid() ? 'Pronto para salvar' : 'Complete as abas obrigatórias'}
                  </span>
                  <Button type="submit" disabled={loading || !isFormValid()}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Salvando...' : 'Salvar Empresa'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
