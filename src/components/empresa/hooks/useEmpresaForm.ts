
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const empresaSchema = z.object({
  // Identificação
  tipo_pessoa: z.enum(['juridica', 'fisica']),
  razao_social: z.string().min(1, 'Razão social é obrigatória'),
  nome_fantasia: z.string().optional(),
  cnpj_cpf: z.string().min(1, 'CNPJ/CPF é obrigatório'),
  inscricao_estadual: z.string().optional(),
  inscricao_municipal: z.string().optional(),
  cnae_principal: z.string().optional(),
  regime_tributario: z.string().optional(),
  
  // Classificação
  tipo_empresa: z.enum(['cliente', 'fornecedor', 'ambos']),
  categoria: z.string().optional(),
  situacao: z.enum(['ativo', 'inativo']),
  prioridade: z.enum(['A', 'B', 'C']).optional(),
  
  // Contato
  responsavel: z.string().optional(),
  email_comercial: z.string().email('Email inválido').optional().or(z.literal('')),
  email_nf: z.string().email('Email inválido').optional().or(z.literal('')),
  telefone_comercial: z.string().optional(),
  telefone_celular: z.string().optional(),
  telefone_whatsapp: z.string().optional(),
  website: z.string().optional(),
  
  // Endereço Principal
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  pais: z.string().optional(),
  
  // Endereço de Entrega
  endereco_entrega_diferente: z.boolean().optional(),
  cep_entrega: z.string().optional(),
  logradouro_entrega: z.string().optional(),
  numero_entrega: z.string().optional(),
  complemento_entrega: z.string().optional(),
  bairro_entrega: z.string().optional(),
  cidade_entrega: z.string().optional(),
  estado_entrega: z.string().optional(),
  
  // Financeiro
  condicao_pagamento: z.string().optional(),
  limite_credito: z.number().optional(),
  moeda_operacao: z.string().optional(),
  banco: z.string().optional(),
  agencia: z.string().optional(),
  conta: z.string().optional(),
  instrucoes_financeiras: z.string().optional(),
  
  // Fiscal
  contribuinte_icms: z.boolean().optional(),
  codigo_ibge: z.string().optional(),
  responsavel_frete: z.enum(['CIF', 'FOB']).optional(),
  cfop_padrao: z.string().optional(),
});

export type EmpresaFormData = z.infer<typeof empresaSchema>;

export function useEmpresaForm(onSuccess: () => void, empresa?: any) {
  const [loading, setLoading] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      tipo_pessoa: 'juridica',
      tipo_empresa: 'cliente',
      situacao: 'ativo',
      prioridade: 'B',
      endereco_entrega_diferente: false,
      contribuinte_icms: true,
      responsavel_frete: 'CIF',
      moeda_operacao: 'BRL',
      pais: 'Brasil',
      ...empresa,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const completed: string[] = [];

    // Verificar aba Identificação
    if (watchedValues.razao_social && watchedValues.cnpj_cpf && watchedValues.tipo_pessoa) {
      completed.push('identificacao');
    }

    // Verificar aba Classificação
    if (watchedValues.tipo_empresa && watchedValues.situacao) {
      completed.push('classificacao');
    }

    // Verificar aba Contato
    if (watchedValues.email_comercial || watchedValues.telefone_comercial) {
      completed.push('contato');
    }

    // Verificar aba Endereço
    if (watchedValues.cep && watchedValues.cidade && watchedValues.estado) {
      completed.push('endereco');
    }

    // Verificar aba Financeiro (opcional)
    if (watchedValues.condicao_pagamento || watchedValues.limite_credito) {
      completed.push('financeiro');
    }

    // Verificar aba Fiscal (opcional)
    if (watchedValues.codigo_ibge || watchedValues.cfop_padrao) {
      completed.push('fiscal');
    }

    // Aba Documentos sempre pode ser considerada completa (opcional)
    completed.push('documentos');

    setCompletedTabs(completed);
  }, [watchedValues]);

  const onSubmit = async (data: EmpresaFormData) => {
    setLoading(true);
    
    try {
      console.log('Dados da empresa:', data);
      
      // Aqui você faria a integração com o Supabase
      // await supabase.from('empresas').insert(data);
      
      toast({
        title: 'Sucesso!',
        description: 'Empresa cadastrada com sucesso.',
      });
      
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar empresa. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onSubmit: form.handleSubmit(onSubmit),
    completedTabs,
  };
}
