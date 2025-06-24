
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { 
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useProductForm } from './hooks/useProductForm';
import ProductFormSidebar from './ProductFormSidebar';
import ProductFormContent from './ProductFormContent';
import { GlassmorphicCard } from './components/GlassmorphicCard';
import { ProgressIndicator } from './components/ProgressIndicator';

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
      <GlassmorphicCard variant="elevated" className="p-6">
        <ProgressIndicator
          progress={calculateProgress()}
          completedSections={completedSections.length}
          totalSections={sections.length}
        />
      </GlassmorphicCard>

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
          <GlassmorphicCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={loading}
                  className="bg-white/80 border-slate-200/60 hover:bg-white/90"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resetar Formulário
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    isFormValid() ? 'text-green-600' : 'text-slate-600'
                  }`}>
                    {isFormValid() ? 'Pronto para salvar' : 'Complete as seções obrigatórias'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {calculateProgress()}% do cadastro concluído
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || !isFormValid()}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Salvando...' : 'Salvar Produto'}
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        </form>
      </Form>
    </div>
  );
}
