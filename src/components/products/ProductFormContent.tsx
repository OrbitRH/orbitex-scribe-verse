
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  Info, 
  Settings, 
  Package, 
  FileText, 
  DollarSign
} from 'lucide-react';
import { ProductFormData } from './types/ProductFormData';
import BasicInfoSection from './sections/BasicInfoSection';
import TechnicalSection from './sections/TechnicalSection';
import StockSection from './sections/StockSection';
import GradeSection from './sections/GradeSection';
import CommercialSection from './sections/CommercialSection';
import { GlassmorphicCard } from './components/GlassmorphicCard';

const sections = [
  {
    id: 'basico',
    title: 'Informações Básicas',
    icon: Info,
    subtitle: 'Dados fundamentais para identificação do produto'
  },
  {
    id: 'tecnico',
    title: 'Dados Técnicos',
    icon: Settings,
    subtitle: 'Especificações técnicas e medidas'
  },
  {
    id: 'estoque',
    title: 'Controle de Estoque',
    icon: Package,
    subtitle: 'Regras de estoque e movimentação'
  },
  {
    id: 'grades',
    title: 'Grades e Variações',
    icon: FileText,
    subtitle: 'Configuração de tamanhos e variações'
  },
  {
    id: 'comercial',
    title: 'Informações Comerciais',
    icon: DollarSign,
    subtitle: 'Preços, custos e margens de lucro'
  },
];

interface ProductFormContentProps {
  activeSection: string;
  form: UseFormReturn<ProductFormData>;
  categorias: any[];
  unidades: any[];
}

export default function ProductFormContent({ 
  activeSection, 
  form, 
  categorias, 
  unidades 
}: ProductFormContentProps) {
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

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <GlassmorphicCard variant="default" className="min-h-[600px]">
      {/* Section Header */}
      <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-white/90 to-slate-50/80">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-100/80">
            {currentSection && React.createElement(currentSection.icon, { 
              className: "h-6 w-6 text-blue-600" 
            })}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {currentSection?.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {currentSection?.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="p-6">
        {renderSectionContent()}
      </div>
    </GlassmorphicCard>
  );
}
