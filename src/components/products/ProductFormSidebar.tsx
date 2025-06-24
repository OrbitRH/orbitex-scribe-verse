
import React from 'react';
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
import { GlassmorphicCard } from './components/GlassmorphicCard';
import { StatusBadge } from './components/StatusBadge';

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
    <GlassmorphicCard variant="elevated" className="p-0">
      <div className="p-6 border-b border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Seções do Formulário</h3>
        <p className="text-sm text-slate-600">Navegue pelas diferentes etapas do cadastro</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const StatusIcon = getSectionIcon(section.id);
          const status = getSectionStatus(section.id);
          const isActive = activeSection === section.id;
          const isCompleted = completedSections.includes(section.id);

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/60 hover:bg-white/80 border border-slate-200/60 hover:border-slate-300/60 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <IconComponent className={`h-5 w-5 mt-0.5 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-white' : 'text-slate-800'
                    }`}>
                      {section.title}
                    </span>
                    <StatusIcon className={`h-4 w-4 ${
                      isCompleted 
                        ? 'text-green-500' 
                        : isActive 
                          ? 'text-white/80' 
                          : 'text-slate-400'
                    }`} />
                  </div>
                  
                  <p className={`text-xs mb-3 ${
                    isActive ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {section.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <StatusBadge 
                      status={status}
                      className={isActive ? 'bg-white/20 text-white border-white/30' : ''}
                    />
                    
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className={isActive ? 'text-white' : ''}>Concluído</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </GlassmorphicCard>
  );
}
