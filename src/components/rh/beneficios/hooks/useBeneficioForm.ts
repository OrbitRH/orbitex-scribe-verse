
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BeneficioFormData, TipoBeneficio } from '../types/BeneficioTypes';

export function useBeneficioForm(beneficio: TipoBeneficio | null, onSuccess: () => void) {
  const form = useForm<BeneficioFormData>({
    defaultValues: {
      nome: beneficio?.nome || '',
      codigo: beneficio?.codigo || '',
      categoria: (beneficio?.categoria as any) || 'saude',
      descricao: beneficio?.descricao || '',
      valor_empresa: beneficio?.valor_empresa?.toString() || '',
      valor_desconto: beneficio?.valor_desconto?.toString() || '',
      tipo_desconto: (beneficio?.tipo_desconto as any) || 'valor_fixo',
      periodicidade: beneficio?.periodicidade || 'mensal',
      permite_dependentes: beneficio?.permite_dependentes || false,
      obrigatorio: beneficio?.obrigatorio || false,
      ativo: beneficio?.ativo ?? true,
    }
  });

  const resetForm = (beneficio: TipoBeneficio | null) => {
    form.reset({
      nome: beneficio?.nome || '',
      codigo: beneficio?.codigo || '',
      categoria: (beneficio?.categoria as any) || 'saude',
      descricao: beneficio?.descricao || '',
      valor_empresa: beneficio?.valor_empresa?.toString() || '',
      valor_desconto: beneficio?.valor_desconto?.toString() || '',
      tipo_desconto: (beneficio?.tipo_desconto as any) || 'valor_fixo',
      periodicidade: beneficio?.periodicidade || 'mensal',
      permite_dependentes: beneficio?.permite_dependentes || false,
      obrigatorio: beneficio?.obrigatorio || false,
      ativo: beneficio?.ativo ?? true,
    });
  };

  const onSubmit = async (data: BeneficioFormData) => {
    try {
      const beneficioData = {
        nome: data.nome,
        codigo: data.codigo || null,
        categoria: data.categoria,
        descricao: data.descricao || null,
        valor_empresa: data.valor_empresa ? parseFloat(data.valor_empresa) : null,
        valor_desconto: data.valor_desconto ? parseFloat(data.valor_desconto) : null,
        tipo_desconto: data.tipo_desconto,
        periodicidade: data.periodicidade,
        permite_dependentes: data.permite_dependentes,
        obrigatorio: data.obrigatorio,
        ativo: data.ativo,
      };

      if (beneficio) {
        const { error } = await supabase
          .from('tipos_beneficios')
          .update(beneficioData)
          .eq('id', beneficio.id);

        if (error) throw error;
        toast.success('Benefício atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('tipos_beneficios')
          .insert(beneficioData);

        if (error) throw error;
        toast.success('Benefício criado com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar benefício:', error);
      toast.error('Erro ao salvar benefício');
    }
  };

  return {
    ...form,
    onSubmit,
    resetForm
  };
}
