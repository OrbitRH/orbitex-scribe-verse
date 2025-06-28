
import type { Database } from '@/integrations/supabase/types';

export type Convenio = Database['public']['Tables']['convenios']['Row'];
export type TipoConvenioType = 'medico' | 'odontologico' | 'farmacia' | 'educacao' | 'outros';

export interface ConvenioFormData {
  nome: string;
  codigo: string;
  tipo: TipoConvenioType;
  empresa_convenio: string;
  descricao: string;
  ans_registro: string;
  permite_dependentes: boolean;
  contato: string;
  telefone: string;
  email: string;
  site: string;
  ativo: boolean;
}

export interface ConvenioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  convenio?: Convenio | null;
  onSuccess: () => void;
}
