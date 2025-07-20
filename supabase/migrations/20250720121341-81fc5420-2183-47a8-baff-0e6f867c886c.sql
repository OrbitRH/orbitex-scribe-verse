
-- Criar enum para tipos de tarefa de compras
CREATE TYPE tipo_tarefa_compra AS ENUM (
  'solicitacao', 
  'cotacao', 
  'aprovacao', 
  'pedido', 
  'acompanhamento', 
  'recebimento', 
  'conferencia_nf', 
  'financeiro'
);

-- Criar enum para prioridade de tarefas
CREATE TYPE prioridade_tarefa AS ENUM ('baixa', 'media', 'alta', 'urgente');

-- Criar enum para status de tarefas
CREATE TYPE status_tarefa AS ENUM ('pendente', 'em_andamento', 'aguardando', 'concluida', 'cancelada');

-- Criar tabela de solicitações de compra (origem de outros setores)
CREATE TABLE solicitacoes_compra (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_solicitacao VARCHAR NOT NULL UNIQUE,
  departamento_solicitante VARCHAR NOT NULL,
  solicitante_id UUID REFERENCES auth.users(id),
  supervisor_id UUID REFERENCES auth.users(id),
  prioridade prioridade_tarefa NOT NULL DEFAULT 'media',
  valor_estimado NUMERIC(15,2),
  justificativa TEXT NOT NULL,
  observacoes TEXT,
  data_necessidade DATE,
  status status_tarefa NOT NULL DEFAULT 'pendente',
  aprovado_por UUID REFERENCES auth.users(id),
  data_aprovacao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens da solicitação
CREATE TABLE solicitacoes_compra_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitacao_id UUID REFERENCES solicitacoes_compra(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES produtos(id),
  descricao_item VARCHAR NOT NULL,
  quantidade NUMERIC(15,3) NOT NULL,
  valor_estimado_unitario NUMERIC(15,4),
  especificacoes TEXT,
  urgente BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de tarefas do workflow de compras
CREATE TABLE tarefas_compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_tarefa VARCHAR NOT NULL UNIQUE,
  tipo_tarefa tipo_tarefa_compra NOT NULL,
  titulo VARCHAR NOT NULL,
  descricao TEXT,
  prioridade prioridade_tarefa NOT NULL DEFAULT 'media',
  status status_tarefa NOT NULL DEFAULT 'pendente',
  responsavel_id UUID REFERENCES auth.users(id),
  solicitante_id UUID REFERENCES auth.users(id),
  departamento_origem VARCHAR,
  prazo_limite TIMESTAMP WITH TIME ZONE,
  data_inicio TIMESTAMP WITH TIME ZONE,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  tempo_estimado_horas INTEGER,
  tempo_gasto_horas INTEGER,
  -- Relacionamentos com outros módulos
  solicitacao_compra_id UUID REFERENCES solicitacoes_compra(id),
  cotacao_id UUID REFERENCES cotacoes(id),
  pedido_compra_id UUID REFERENCES pedidos_compra(id),
  recebimento_id UUID REFERENCES recebimentos(id),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de histórico de workflow
CREATE TABLE workflow_compras_historico (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarefa_id UUID REFERENCES tarefas_compras(id) ON DELETE CASCADE,
  etapa_origem tipo_tarefa_compra,
  etapa_destino tipo_tarefa_compra,
  usuario_id UUID REFERENCES auth.users(id),
  data_transicao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  observacoes TEXT,
  dados_adicionais JSONB
);

-- Criar tabela de regras de aprovação
CREATE TABLE regras_aprovacao_compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  departamento VARCHAR,
  valor_minimo NUMERIC(15,2) DEFAULT 0,
  valor_maximo NUMERIC(15,2),
  aprovador_id UUID REFERENCES auth.users(id),
  ordem_aprovacao INTEGER DEFAULT 1,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para gerar número de solicitação
CREATE OR REPLACE FUNCTION gerar_numero_solicitacao()
RETURNS TRIGGER AS $$
DECLARE
    novo_numero VARCHAR;
    contador INTEGER;
BEGIN
    IF NEW.numero_solicitacao IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(numero_solicitacao FROM 3) AS INTEGER)), 0) + 1
        INTO contador
        FROM solicitacoes_compra
        WHERE numero_solicitacao ~ '^SC[0-9]+$';
        
        novo_numero := 'SC' || LPAD(contador::text, 6, '0');
        NEW.numero_solicitacao := novo_numero;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Função para gerar número de tarefa
CREATE OR REPLACE FUNCTION gerar_numero_tarefa()
RETURNS TRIGGER AS $$
DECLARE
    novo_numero VARCHAR;
    contador INTEGER;
BEGIN
    IF NEW.numero_tarefa IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(numero_tarefa FROM 3) AS INTEGER)), 0) + 1
        INTO contador
        FROM tarefas_compras
        WHERE numero_tarefa ~ '^TC[0-9]+$';
        
        novo_numero := 'TC' || LPAD(contador::text, 6, '0');
        NEW.numero_tarefa := novo_numero;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para numeração automática
CREATE TRIGGER trigger_gerar_numero_solicitacao
    BEFORE INSERT ON solicitacoes_compra
    FOR EACH ROW
    EXECUTE FUNCTION gerar_numero_solicitacao();

CREATE TRIGGER trigger_gerar_numero_tarefa
    BEFORE INSERT ON tarefas_compras
    FOR EACH ROW
    EXECUTE FUNCTION gerar_numero_tarefa();

-- Triggers para updated_at
CREATE TRIGGER trigger_solicitacoes_compra_updated_at
    BEFORE UPDATE ON solicitacoes_compra
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_tarefas_compras_updated_at
    BEFORE UPDATE ON tarefas_compras
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Habilitar RLS
ALTER TABLE solicitacoes_compra ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes_compra_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas_compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_compras_historico ENABLE ROW LEVEL SECURITY;
ALTER TABLE regras_aprovacao_compras ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Authenticated users can manage solicitacoes_compra" ON solicitacoes_compra
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage solicitacoes_compra_itens" ON solicitacoes_compra_itens
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tarefas_compras" ON tarefas_compras
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view workflow_compras_historico" ON workflow_compras_historico
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert workflow_compras_historico" ON workflow_compras_historico
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage regras_aprovacao_compras" ON regras_aprovacao_compras
    FOR ALL USING (is_admin(auth.uid()));
