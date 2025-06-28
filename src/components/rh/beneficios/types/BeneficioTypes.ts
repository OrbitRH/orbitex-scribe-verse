
import type { Database } from '@/integrations/supabase/types';

export type TipoBeneficio = Database['public']['Tables']['tipos_beneficios']['Row'];
export type CategoriaType = 'saude' | 'alimentacao' | 'transporte' | 'educacao' | 'outros';
export type TipoDescontoType = 'valor_fixo' | 'percentual' | 'sem_desconto';

export interface BeneficioFormData {
  nome: string;
  codigo: string;
  categoria: CategoriaType;
  descricao: string;
  valor_empresa: string;
  valor_desconto: string;
  tipo_desconto: TipoDescontoType;
  periodicidade: string;
  permite_dependentes: boolean;
  obrigatorio: boolean;
  ativo: boolean;
}

export interface BeneficioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficio?: TipoBeneficio | null;
  onSuccess: () => void;
}
