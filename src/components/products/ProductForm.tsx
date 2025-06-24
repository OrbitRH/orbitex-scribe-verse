
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  Settings, 
  Package, 
  FileText, 
  DollarSign, 
  CheckCircle2,
  Circle,
  Save,
  RotateCcw
} from 'lucide-react';
import { useProductForm } from './hooks/useProductForm';
import BasicInfoSection from './sections/BasicInfoSection';
import TechnicalSection from './sections/TechnicalSection';
import StockSection from './sections/StockSection';
import GradeSection from './sections/GradeSection';
import CommercialSection from './sections/CommercialSection';

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
}

const sections = [
  {
    id: 'basico',
    title: 'Informações Básicas',
    icon: Info,
    description: 'Nome, código, tipo e descrição',
    required: true,
  },
  {
    id: 'tecnico',
    title: 'Dados Técnicos',
    icon: Settings,
    description: 'NCM, dimensões e especificações',
    required: false,
  },
  {
    id: 'estoque',
    title: 'Controle de Estoque',
    icon: Package,
    description: 'Regras de estoque e validade',
    required: false,
  },
  {
    id: 'grades',
    title: 'Grades e Variações',
    icon: FileText,
    description: 'Tamanhos, cores e combinações',
    required: false,
  },
  {
    id: 'comercial',
    title: 'Informações Comerciais',
    icon: DollarSign,
    description: 'Preços, custos e markup',
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

  const getSectionIcon = (sectionId: string) => {
    const isCompleted = completedSections.includes(sectionId);
    return isCompleted ? CheckCircle2 : Circle;
  };

  const getSectionStatus = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    const isCompleted = completedSections.includes(sectionId);
    
    if (isCompleted) return 'completed';
    if (section?.required) return 'required';
    return 'optional';
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'basico':
        return <BasicInfoSection form={form} categorias={categorias} unidades={unidades} />;
      case 'tecnico':
        return <TechnicalSection form={form} />;
      case 'estoque':
        return <StockSection form={form} />;
      case 'grades':
        return <GradeSection form={form} />;
      case 'comercial':
        return <CommercialSection form={form} />;
      default:
        return null;
    }
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
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Seções</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const IconComponent = section.icon;
                      const StatusIcon = getSectionIcon(section.id);
                      const status = getSectionStatus(section.id);
                      const isActive = activeSection === section.id;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className={`h-5 w-5 mt-0.5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-medium ${isActive ? 'text-primary-foreground' : ''}`}>
                                  {section.title}
                                </span>
                                <StatusIcon className={`h-4 w-4 ${
                                  status === 'completed' 
                                    ? 'text-green-500' 
                                    : isActive 
                                      ? 'text-primary-foreground' 
                                      : 'text-muted-foreground'
                                }`} />
                              </div>
                              <p className={`text-xs ${
                                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {section.description}
                              </p>
                              {section.required && (
                                <Badge 
                                  variant={isActive ? "secondary" : "outline"} 
                                  className="mt-1 text-xs"
                                >
                                  Obrigatório
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Conteúdo principal */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(sections.find(s => s.id === activeSection)?.icon || Info, { className: "h-5 w-5" })}
                    {sections.find(s => s.id === activeSection)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderSectionContent()}
                </CardContent>
              </Card>
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
