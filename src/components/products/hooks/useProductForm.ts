
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { productSchema, ProductFormData } from '../types/ProductFormData';

export function useProductForm(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      controle_estoque: 'padrao',
      controla_lote: false,
      controla_grade: false,
      peso_bruto: 0,
      peso_liquido: 0,
      perda_tecnica_percent: 0,
    },
  });

  useEffect(() => {
    fetchCategorias();
    fetchUnidades();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase
      .from('categorias_produtos')
      .select('*')
      .eq('ativo', true)
      .order('nome');
    
    if (!error && data) {
      setCategorias(data);
    }
  };

  const fetchUnidades = async () => {
    const { data, error } = await supabase
      .from('unidades_medida')
      .select('*')
      .eq('ativo', true)
      .order('nome');
    
    if (!error && data) {
      setUnidades(data);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      // Prepare data for Supabase insertion, ensuring all required fields are present
      const insertData = {
        nome_comercial: data.nome_comercial,
        nome_tecnico: data.nome_tecnico || null,
        codigo_interno: data.codigo_interno,
        ncm: data.ncm || null,
        cfop_padrao: data.cfop_padrao || null,
        tipo_produto: data.tipo_produto,
        categoria_id: data.categoria_id || null,
        unidade_medida_id: data.unidade_medida_id,
        peso_bruto: data.peso_bruto || null,
        peso_liquido: data.peso_liquido || null,
        comprimento: data.comprimento || null,
        largura: data.largura || null,
        altura: data.altura || null,
        controle_estoque: data.controle_estoque,
        controla_lote: data.controla_lote,
        controla_grade: data.controla_grade,
        validade_dias: data.validade_dias || null,
        perda_tecnica_percent: data.perda_tecnica_percent || null,
        tempo_producao_horas: data.tempo_producao_horas || null,
        custo_transformacao: data.custo_transformacao || null,
        preco_medio_compra: data.preco_medio_compra || null,
        preco_sugerido_venda: data.preco_sugerido_venda || null,
        markup_padrao: data.markup_padrao || null,
        observacoes_tecnicas: data.observacoes_tecnicas || null,
        descricao: data.descricao || null,
      };

      const { error } = await supabase
        .from('produtos')
        .insert(insertData);

      if (error) throw error;

      toast({
        title: "Produto cadastrado com sucesso!",
        description: "O produto foi salvo no sistema.",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar produto",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    categorias,
    unidades,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
