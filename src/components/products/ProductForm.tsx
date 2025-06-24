
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Save,
  RotateCcw
} from 'lucide-react';
import { useProductForm } from './hooks/useProductForm';
import ProductFormSidebar from './ProductFormSidebar';
import ProductFormContent from './ProductFormContent';

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
}

const sections = [
  {
    id: 'basico',
    required: true,
  },
  {
    id: 'tecnico',
    required: false,
  },
  {
    id: 'estoque',
    required: false,
  },
  {
    id: 'grades',
    required: false,
  },
  {
    id: 'comercial',
    required: false,
  },
];

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [activeSection, setActiveSection] = useState('basico');
  const { form, loading, categorias, unidades, onSubmit, completedSections } = useProductForm(onSuccess, product);

  const calculateProgress = () => {
    const requiredSections = sections.filter(s => s.required);
    const completedRequired = requiredSections.filter(s => completedSections.includes(s.id));
    const optionalCompleted = sections.filter(s => !s.required && completedSections.includes(s.id));
    
    const baseProgress = (completedRequired.length / requiredSections.length) * 70;
    const bonusProgress = (optionalCompleted.length / (sections.length - requiredSections.length)) * 30;
    
    return Math.round(baseProgress + bonusProgress);
  };

  const isFormValid = () => {
    const requiredSections = sections.filter(s => s.required);
    return requiredSections.every(s => completedSections.includes(s.id));
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {product ? 'Editando Produto' : 'Novo Produto'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete as informações para cadastrar o produto no sistema
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{calculateProgress()}% completo</div>
            <div className="text-xs text-muted-foreground">
              {completedSections.length} de {sections.length} seções
            </div>
          </div>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar de navegação */}
            <div className="lg:col-span-1">
              <ProductFormSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                completedSections={completedSections}
              />
            </div>

            {/* Conteúdo principal */}
            <div className="lg:col-span-3">
              <ProductFormContent
                activeSection={activeSection}
                form={form}
                categorias={categorias}
                unidades={unidades}
              />
            </div>
          </div>

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
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {isFormValid() ? 'Pronto para salvar' : 'Complete as seções obrigatórias'}
                  </span>
                  <Button type="submit" disabled={loading || !isFormValid()}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Salvando...' : 'Salvar Produto'}
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
