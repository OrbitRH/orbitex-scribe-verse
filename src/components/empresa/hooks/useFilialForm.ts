
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const filialSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().optional(),
  inscricao_estadual: z.string().optional(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().max(2, 'Estado deve ter 2 caracteres').optional(),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  matriz: z.boolean().default(false),
  ativo: z.boolean().default(true),
});

export type FilialFormData = z.infer<typeof filialSchema>;

interface UseFilialFormProps {
  filial?: any;
  onSuccess: () => void;
}

export function useFilialForm({ filial, onSuccess }: UseFilialFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FilialFormData>({
    resolver: zodResolver(filialSchema),
    defaultValues: filial ? {
      codigo: filial.codigo || '',
      nome: filial.nome || '',
      cnpj: filial.cnpj || '',
      inscricao_estadual: filial.inscricao_estadual || '',
      endereco: filial.endereco || '',
      cidade: filial.cidade || '',
      estado: filial.estado || '',
      cep: filial.cep || '',
      telefone: filial.telefone || '',
      email: filial.email || '',
      matriz: filial.matriz || false,
      ativo: filial.ativo !== undefined ? filial.ativo : true,
    } : {
      codigo: '',
      nome: '',
      cnpj: '',
      inscricao_estadual: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      matriz: false,
      ativo: true,
    },
  });

  const saveFilialMutation = useMutation({
    mutationFn: async (data: FilialFormData) => {
      const filialData = {
        codigo: data.codigo,
        nome: data.nome,
        cnpj: data.cnpj || null,
        inscricao_estadual: data.inscricao_estadual || null,
        endereco: data.endereco || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
        cep: data.cep || null,
        telefone: data.telefone || null,
        email: data.email || null,
        matriz: data.matriz,
        ativo: data.ativo,
      };

      if (filial?.id) {
        const { error } = await supabase
          .from('filiais')
          .update(filialData)
          .eq('id', filial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('filiais')
          .insert(filialData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filiais'] });
      toast({
        title: 'Sucesso',
        description: `Filial ${filial ? 'atualizada' : 'criada'} com sucesso!`,
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: `Erro ao ${filial ? 'atualizar' : 'criar'} filial.`,
        variant: 'destructive',
      });
      console.error('Erro ao salvar filial:', error);
    },
  });

  const onSubmit = (data: FilialFormData) => {
    saveFilialMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    saveFilialMutation,
  };
}
