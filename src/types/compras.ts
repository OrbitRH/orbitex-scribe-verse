
export type TipoTarefaCompra = 
  | 'solicitacao'
  | 'cotacao' 
  | 'aprovacao'
  | 'pedido'
  | 'acompanhamento'
  | 'recebimento'
  | 'conferencia_nf'
  | 'financeiro';

export type PrioridadeTarefa = 'baixa' | 'media' | 'alta' | 'urgente';

export type StatusTarefa = 'pendente' | 'em_andamento' | 'aguardando' | 'concluida' | 'cancelada';

export type StatusPedidoCompra = 'rascunho' | 'pendente_aprovacao' | 'aprovado' | 'enviado' | 'recebido_parcial' | 'recebido_total' | 'cancelado';

export type StatusCotacao = 'pendente' | 'respondida' | 'aceita' | 'rejeitada' | 'expirada';

export interface PedidoCompra {
  id: string;
  numero_pedido: string;
  empresa_fornecedor_id?: string;
  data_pedido: string;
  data_entrega_prevista?: string;
  status: StatusPedidoCompra;
  valor_total: number;
  desconto_total: number;
  valor_frete: number;
  observacoes?: string;
  condicoes_pagamento?: string;
  prazo_entrega_dias?: number;
  aprovado_por?: string;
  data_aprovacao?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  empresa_fornecedor?: {
    id: string;
    razao_social: string;
    nome_fantasia?: string;
    cnpj_cpf?: string;
  };
  itens?: PedidoCompraItem[];
}

export interface PedidoCompraItem {
  id: string;
  pedido_compra_id: string;
  produto_id?: string;
  quantidade: number;
  preco_unitario: number;
  desconto_percentual: number;
  valor_total: number;
  observacoes?: string;
  created_at: string;
  // Relacionamentos
  produto?: {
    id: string;
    codigo_interno: string;
    nome_comercial: string;
    unidade_medida?: {
      codigo: string;
      nome: string;
    };
  };
}

export interface Cotacao {
  id: string;
  numero_cotacao: string;
  titulo: string;
  descricao?: string;
  data_solicitacao: string;
  data_limite_resposta: string;
  status: StatusCotacao;
  observacoes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  itens?: CotacaoItem[];
  fornecedores?: CotacaoFornecedor[];
}

export interface CotacaoItem {
  id: string;
  cotacao_id: string;
  produto_id?: string;
  quantidade: number;
  especificacoes?: string;
  created_at: string;
  // Relacionamentos
  produto?: {
    id: string;
    codigo_interno: string;
    nome_comercial: string;
    unidade_medida?: {
      codigo: string;
      nome: string;
    };
  };
}

export interface CotacaoFornecedor {
  id: string;
  cotacao_id: string;
  empresa_fornecedor_id?: string;
  data_resposta?: string;
  valor_total?: number;
  observacoes_fornecedor?: string;
  status: StatusCotacao;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  empresa_fornecedor?: {
    id: string;
    razao_social: string;
    nome_fantasia?: string;
    cnpj_cpf?: string;
  };
  itens?: CotacaoFornecedorItem[];
}

export interface CotacaoFornecedorItem {
  id: string;
  cotacao_fornecedor_id: string;
  cotacao_item_id: string;
  preco_unitario?: number;
  prazo_entrega_dias?: number;
  observacoes?: string;
  created_at: string;
}

export interface Recebimento {
  id: string;
  pedido_compra_id?: string;
  numero_nota_fiscal?: string;
  data_recebimento: string;
  valor_nota_fiscal?: number;
  observacoes?: string;
  recebido_por?: string;
  created_at: string;
  // Relacionamentos
  pedido_compra?: {
    id: string;
    numero_pedido: string;
    empresa_fornecedor?: {
      razao_social: string;
    };
  };
  itens?: RecebimentoItem[];
}

export interface RecebimentoItem {
  id: string;
  recebimento_id: string;
  pedido_item_id?: string;
  quantidade_recebida: number;
  quantidade_aprovada?: number;
  quantidade_rejeitada: number;
  motivo_rejeicao?: string;
  created_at: string;
  // Relacionamentos
  pedido_item?: {
    produto?: {
      codigo_interno: string;
      nome_comercial: string;
    };
    quantidade: number;
  };
}

// Interfaces para Workflow
export interface SolicitacaoCompra {
  id: string;
  numero_solicitacao: string;
  departamento_solicitante: string;
  solicitante_id?: string;
  supervisor_id?: string;
  prioridade: PrioridadeTarefa;
  valor_estimado?: number;
  justificativa: string;
  observacoes?: string;
  data_necessidade?: string;
  status: StatusTarefa;
  aprovado_por?: string;
  data_aprovacao?: string;
  created_at: string;
  updated_at: string;
}

export interface SolicitacaoCompraItem {
  id: string;
  solicitacao_id: string;
  produto_id?: string;
  descricao_item: string;
  quantidade: number;
  valor_estimado_unitario?: number;
  especificacoes?: string;
  urgente: boolean;
  created_at: string;
}

export interface TarefaCompra {
  id: string;
  numero_tarefa: string;
  tipo_tarefa: TipoTarefaCompra;
  titulo: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  status: StatusTarefa;
  responsavel_id?: string;
  solicitante_id?: string;
  departamento_origem?: string;
  prazo_limite?: string;
  data_inicio?: string;
  data_conclusao?: string;
  tempo_estimado_horas?: number;
  tempo_gasto_horas?: number;
  solicitacao_compra_id?: string;
  cotacao_id?: string;
  pedido_compra_id?: string;
  recebimento_id?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  responsavel?: {
    full_name: string;
    email: string;
  };
  solicitante?: {
    full_name: string;
    email: string;
  };
  solicitacao_compra?: SolicitacaoCompra;
  cotacao?: Cotacao;
  pedido_compra?: PedidoCompra;
  recebimento?: Recebimento;
}

export interface WorkflowComprasHistorico {
  id: string;
  tarefa_id: string;
  etapa_origem?: TipoTarefaCompra;
  etapa_destino?: TipoTarefaCompra;
  usuario_id?: string;
  data_transicao: string;
  observacoes?: string;
  dados_adicionais?: Record<string, any>;
}

export interface RegraAprovacaoCompra {
  id: string;
  departamento?: string;
  valor_minimo: number;
  valor_maximo?: number;
  aprovador_id?: string;
  ordem_aprovacao: number;
  ativo: boolean;
  created_at: string;
}

export interface DashboardComprasData {
  tarefas_pendentes: number;
  tarefas_em_andamento: number;
  tarefas_atrasadas: number;
  pedidos_pendentes: number;
  cotacoes_abertas: number;
  valor_mes_atual: number;
  fornecedores_ativos: number;
  valor_total_mes: number;
  pedidos_recentes: PedidoCompra[];
  cotacoes_vencendo: Cotacao[];
  tarefas_recentes: TarefaCompra[];
}
