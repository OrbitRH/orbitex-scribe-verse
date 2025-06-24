
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const sections = [
  {
    id: 'basico',
    title: 'Informações Básicas',
    icon: Info,
  },
  {
    id: 'tecnico',
    title: 'Dados Técnicos',
    icon: Settings,
  },
  {
    id: 'estoque',
    title: 'Controle de Estoque',
    icon: Package,
  },
  {
    id: 'grades',
    title: 'Grades e Variações',
    icon: FileText,
  },
  {
    id: 'comercial',
    title: 'Informações Comerciais',
    icon: DollarSign,
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {currentSection && React.createElement(currentSection.icon, { className: "h-5 w-5" })}
          {currentSection?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderSectionContent()}
      </CardContent>
    </Card>
  );
}
