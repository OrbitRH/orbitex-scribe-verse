
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Convenio } from '../types/ConvenioTypes';

export function useConvenios() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConvenios = async () => {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setConvenios(data || []);
    } catch (error) {
      console.error('Erro ao carregar convênios:', error);
      toast.error('Erro ao carregar convênios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este convênio?')) return;

    try {
      const { error } = await supabase
        .from('convenios')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Convênio desativado com sucesso');
      fetchConvenios();
    } catch (error) {
      console.error('Erro ao desativar convênio:', error);
      toast.error('Erro ao desativar convênio');
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  return {
    convenios,
    loading,
    fetchConvenios,
    handleDelete,
  };
}
