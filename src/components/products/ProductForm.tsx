
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Package, Info, Settings, FileText, DollarSign } from 'lucide-react';

const productSchema = z.object({
  nome_comercial: z.string().min(1, 'Nome comercial é obrigatório'),
  nome_tecnico: z.string().optional(),
  codigo_interno: z.string().min(1, 'Código interno é obrigatório'),
  ncm: z.string().optional(),
  cfop_padrao: z.string().optional(),
  tipo_produto: z.enum(['materia_prima', 'produto_acabado', 'em_processo', 'aviamento', 'servico']),
  categoria_id: z.string().optional(),
  unidade_medida_id: z.string().min(1, 'Unidade de medida é obrigatória'),
  peso_bruto: z.number().min(0).optional(),
  peso_liquido: z.number().min(0).optional(),
  comprimento: z.number().min(0).optional(),
  largura: z.number().min(0).optional(),
  altura: z.number().min(0).optional(),
  controle_estoque: z.enum(['padrao', 'grade', 'lote']),
  controla_lote: z.boolean(),
  controla_grade: z.boolean(),
  validade_dias: z.number().min(0).optional(),
  perda_tecnica_percent: z.number().min(0).max(100).optional(),
  tempo_producao_horas: z.number().min(0).optional(),
  custo_transformacao: z.number().min(0).optional(),
  preco_medio_compra: z.number().min(0).optional(),
  preco_sugerido_venda: z.number().min(0).optional(),
  markup_padrao: z.number().min(0).optional(),
  observacoes_tecnicas: z.string().optional(),
  descricao: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
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
      const { error } = await supabase
        .from('produtos')
        .insert([data]);

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

  const tiposProduto = [
    { value: 'materia_prima', label: 'Matéria-Prima' },
    { value: 'produto_acabado', label: 'Produto Acabado' },
    { value: 'em_processo', label: 'Em Processo' },
    { value: 'aviamento', label: 'Aviamento' },
    { value: 'servico', label: 'Serviço' },
  ];

  const tiposControleEstoque = [
    { value: 'padrao', label: 'Padrão' },
    { value: 'grade', label: 'Por Grade' },
    { value: 'lote', label: 'Por Lote' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Novo Produto
        </DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Tabs defaultValue="basico" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basico" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Básico
              </TabsTrigger>
              <TabsTrigger value="tecnico" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Técnico
              </TabsTrigger>
              <TabsTrigger value="estoque" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                Estoque
              </TabsTrigger>
              <TabsTrigger value="ficha" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Ficha
              </TabsTrigger>
              <TabsTrigger value="comercial" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Comercial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basico" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome_comercial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Comercial *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nome_tecnico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Técnico</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome técnico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codigo_interno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Interno *</FormLabel>
                      <FormControl>
                        <Input placeholder="Código único" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo_produto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Produto *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tiposProduto.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoria_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria.id} value={categoria.id}>
                              {categoria.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unidade_medida_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade de Medida *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unidades.map((unidade) => (
                            <SelectItem key={unidade.id} value={unidade.id}>
                              {unidade.codigo} - {unidade.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição detalhada do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="tecnico" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ncm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NCM</FormLabel>
                      <FormControl>
                        <Input placeholder="00000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cfop_padrao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CFOP Padrão</FormLabel>
                      <FormControl>
                        <Input placeholder="0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="peso_bruto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Bruto (kg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.001"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="peso_liquido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Líquido (kg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.001"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comprimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comprimento (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="largura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Largura (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tempo_producao_horas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de Produção (horas)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="estoque" className="space-y-4">
              <FormField
                control={form.control}
                name="controle_estoque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Controle de Estoque</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tiposControleEstoque.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="controla_grade"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Controla Grade</FormLabel>
                        <FormDescription>
                          Produto tem variações de tamanho/cor
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="controla_lote"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Controla Lote</FormLabel>
                        <FormDescription>
                          Produto requer controle por lote
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validade_dias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Validade (dias)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormDescription>
                        Deixe em branco se não tem validade
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="perda_tecnica_percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perda Técnica (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          max="100"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="ficha" className="space-y-4">
              <FormField
                control={form.control}
                name="observacoes_tecnicas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações Técnicas</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Observações sobre processo produtivo, composição, etc."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A ficha técnica com componentes (BOM) poderá ser configurada após o cadastro do produto.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="comercial" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="custo_transformacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custo de Transformação (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preco_medio_compra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Médio de Compra (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preco_sugerido_venda"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Sugerido de Venda (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="markup_padrao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markup Padrão (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
