
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { productSchema, ProductFormData } from '../types/ProductFormData';

export function useProductForm(onSuccess: () => void, product?: any) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
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
      ...product,
    },
  });

  useEffect(() => {
    fetchCategorias();
    fetchUnidades();
  }, []);

  useEffect(() => {
    // Watch form changes to update completed sections
    const subscription = form.watch((values) => {
      updateCompletedSections(values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const updateCompletedSections = (values: Partial<ProductFormData>) => {
    const completed: string[] = [];

    // Seção básica (obrigatória)
    if (values.nome_comercial && values.codigo_interno && values.tipo_produto && values.unidade_medida_id) {
      completed.push('basico');
    }

    // Seção técnica
    if (values.ncm || values.cfop_padrao || values.peso_bruto || values.comprimento) {
      completed.push('tecnico');
    }

    // Seção estoque
    if (values.controle_estoque || values.controla_lote || values.validade_dias) {
      completed.push('estoque');
    }

    // Seção grades
    if (values.controla_grade) {
      completed.push('grades');
    }

    // Seção comercial
    if (values.preco_medio_compra || values.preco_sugerido_venda || values.markup_padrao) {
      completed.push('comercial');
    }

    setCompletedSections(completed);
  };

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

      let error;

      if (product?.id) {
        // Update existing product
        const result = await supabase
          .from('produtos')
          .update(insertData)
          .eq('id', product.id);
        error = result.error;
      } else {
        // Insert new product
        const result = await supabase
          .from('produtos')
          .insert(insertData);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: product ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!",
        description: "As informações foram salvas no sistema.",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar produto",
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
    completedSections,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
