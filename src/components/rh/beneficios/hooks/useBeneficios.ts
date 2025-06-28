
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TipoBeneficio } from '../types/BeneficioTypes';

export function useBeneficios() {
  const [beneficios, setBeneficios] = useState<TipoBeneficio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficios = async () => {
    try {
      const { data, error } = await supabase
        .from('tipos_beneficios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setBeneficios(data || []);
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
      toast.error('Erro ao carregar benefícios');
    } finally {
      setLoading(false);
    }
  };

  const deleteBeneficio = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este benefício?')) return;

    try {
      const { error } = await supabase
        .from('tipos_beneficios')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Benefício desativado com sucesso');
      fetchBeneficios();
    } catch (error) {
      console.error('Erro ao desativar benefício:', error);
      toast.error('Erro ao desativar benefício');
    }
  };

  useEffect(() => {
    fetchBeneficios();
  }, []);

  return {
    beneficios,
    loading,
    fetchBeneficios,
    deleteBeneficio
  };
}
