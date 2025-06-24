
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  Settings, 
  Package, 
  FileText, 
  DollarSign, 
  CheckCircle2,
  Circle
} from 'lucide-react';

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

interface ProductFormSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  completedSections: string[];
}

export default function ProductFormSidebar({ 
  activeSection, 
  onSectionChange, 
  completedSections 
}: ProductFormSidebarProps) {
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

  return (
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
                onClick={() => onSectionChange(section.id)}
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
  );
}
