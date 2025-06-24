
import * as z from 'zod';

export const productSchema = z.object({
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

export type ProductFormData = z.infer<typeof productSchema>;
