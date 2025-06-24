
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const empresaSchema = z.object({
  razao_social: z.string().min(1, 'Razão social é obrigatória'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().optional(),
  inscricao_estadual: z.string().optional(),
  inscricao_municipal: z.string().optional(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  site: z.string().optional(),
  regime_tributario: z.string().optional(),
  aliquota_padrao: z.string().optional(),
});

export type EmpresaFormData = z.infer<typeof empresaSchema>;

export function useEmpresaConfig() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: empresaConfig, isLoading } = useQuery({
    queryKey: ['empresa-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empresa_config')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    },
  });

  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    values: empresaConfig ? {
      razao_social: empresaConfig.razao_social || '',
      nome_fantasia: empresaConfig.nome_fantasia || '',
      cnpj: empresaConfig.cnpj || '',
      inscricao_estadual: empresaConfig.inscricao_estadual || '',
      inscricao_municipal: empresaConfig.inscricao_municipal || '',
      endereco: empresaConfig.endereco || '',
      cidade: empresaConfig.cidade || '',
      estado: empresaConfig.estado || '',
      cep: empresaConfig.cep || '',
      telefone: empresaConfig.telefone || '',
      email: empresaConfig.email || '',
      site: empresaConfig.site || '',
      regime_tributario: empresaConfig.regime_tributario || 'simples_nacional',
      aliquota_padrao: empresaConfig.aliquota_padrao?.toString() || '0',
    } : undefined,
  });

  const saveEmpresaMutation = useMutation({
    mutationFn: async (data: EmpresaFormData) => {
      const empresaData = {
        razao_social: data.razao_social,
        nome_fantasia: data.nome_fantasia || null,
        cnpj: data.cnpj || null,
        inscricao_estadual: data.inscricao_estadual || null,
        inscricao_municipal: data.inscricao_municipal || null,
        endereco: data.endereco || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
        cep: data.cep || null,
        telefone: data.telefone || null,
        email: data.email || null,
        site: data.site || null,
        regime_tributario: data.regime_tributario || 'simples_nacional',
        aliquota_padrao: data.aliquota_padrao ? parseFloat(data.aliquota_padrao) : 0,
      };

      if (empresaConfig?.id) {
        const { error } = await supabase
          .from('empresa_config')
          .update(empresaData)
          .eq('id', empresaConfig.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('empresa_config')
          .insert(empresaData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresa-config'] });
      toast({
        title: 'Sucesso',
        description: 'Dados da empresa salvos com sucesso!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar dados da empresa.',
        variant: 'destructive',
      });
      console.error('Erro ao salvar empresa:', error);
    },
  });

  const onSubmit = (data: EmpresaFormData) => {
    saveEmpresaMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSaving: saveEmpresaMutation.isPending,
  };
}
