
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ConvenioFormData, Convenio } from '../types/ConvenioTypes';

export function useConvenioForm(convenio: Convenio | null, onSuccess: () => void) {
  const form = useForm<ConvenioFormData>({
    defaultValues: {
      nome: convenio?.nome || '',
      codigo: convenio?.codigo || '',
      tipo: (convenio?.tipo as ConvenioFormData['tipo']) || 'medico',
      empresa_convenio: convenio?.empresa_convenio || '',
      descricao: convenio?.descricao || '',
      ans_registro: convenio?.ans_registro || '',
      permite_dependentes: convenio?.permite_dependentes || false,
      contato: convenio?.contato || '',
      telefone: convenio?.telefone || '',
      email: convenio?.email || '',
      site: convenio?.site || '',
      ativo: convenio?.ativo ?? true,
    }
  });

  const onSubmit = async (data: ConvenioFormData) => {
    try {
      const convenioData = {
        nome: data.nome,
        codigo: data.codigo || null,
        tipo: data.tipo,
        empresa_convenio: data.empresa_convenio || null,
        descricao: data.descricao || null,
        ans_registro: data.ans_registro || null,
        permite_dependentes: data.permite_dependentes,
        contato: data.contato || null,
        telefone: data.telefone || null,
        email: data.email || null,
        site: data.site || null,
        ativo: data.ativo,
      };

      if (convenio) {
        const { error } = await supabase
          .from('convenios')
          .update(convenioData)
          .eq('id', convenio.id);

        if (error) throw error;
        toast.success('Convênio atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('convenios')
          .insert(convenioData);

        if (error) throw error;
        toast.success('Convênio criado com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar convênio:', error);
      toast.error('Erro ao salvar convênio');
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
