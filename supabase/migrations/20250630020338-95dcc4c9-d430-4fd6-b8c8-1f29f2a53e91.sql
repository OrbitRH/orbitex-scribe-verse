
-- Criar enum para status de pedidos de compra
CREATE TYPE status_pedido_compra AS ENUM ('rascunho', 'pendente_aprovacao', 'aprovado', 'enviado', 'recebido_parcial', 'recebido_total', 'cancelado');

-- Criar enum para status de cotações
CREATE TYPE status_cotacao AS ENUM ('pendente', 'respondida', 'aceita', 'rejeitada', 'expirada');

-- Criar enum para tipo de documento de compra
CREATE TYPE tipo_documento_compra AS ENUM ('orcamento', 'cotacao', 'pedido');

-- Criar tabela de pedidos de compra
CREATE TABLE pedidos_compra (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_pedido VARCHAR NOT NULL UNIQUE,
  empresa_fornecedor_id UUID REFERENCES empresas(id),
  data_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
  data_entrega_prevista DATE,
  status status_pedido_compra NOT NULL DEFAULT 'rascunho',
  valor_total NUMERIC(15,2) DEFAULT 0,
  desconto_total NUMERIC(15,2) DEFAULT 0,
  valor_frete NUMERIC(15,2) DEFAULT 0,
  observacoes TEXT,
  condicoes_pagamento TEXT,
  prazo_entrega_dias INTEGER,
  aprovado_por UUID REFERENCES auth.users(id),
  data_aprovacao TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens dos pedidos de compra
CREATE TABLE pedidos_compra_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_compra_id UUID REFERENCES pedidos_compra(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES produtos(id),
  quantidade NUMERIC(15,3) NOT NULL,
  preco_unitario NUMERIC(15,4) NOT NULL,
  desconto_percentual NUMERIC(5,2) DEFAULT 0,
  valor_total NUMERIC(15,2) NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de cotações
CREATE TABLE cotacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_cotacao VARCHAR NOT NULL UNIQUE,
  titulo VARCHAR NOT NULL,
  descricao TEXT,
  data_solicitacao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_limite_resposta DATE NOT NULL,
  status status_cotacao NOT NULL DEFAULT 'pendente',
  observacoes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de cotações por fornecedor
CREATE TABLE cotacoes_fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cotacao_id UUID REFERENCES cotacoes(id) ON DELETE CASCADE,
  empresa_fornecedor_id UUID REFERENCES empresas(id),
  data_resposta DATE,
  valor_total NUMERIC(15,2),
  observacoes_fornecedor TEXT,
  status status_cotacao NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens das cotações
CREATE TABLE cotacoes_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cotacao_id UUID REFERENCES cotacoes(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES produtos(id),
  quantidade NUMERIC(15,3) NOT NULL,
  especificacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de respostas dos fornecedores aos itens da cotação
CREATE TABLE cotacoes_fornecedores_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cotacao_fornecedor_id UUID REFERENCES cotacoes_fornecedores(id) ON DELETE CASCADE,
  cotacao_item_id UUID REFERENCES cotacoes_itens(id) ON DELETE CASCADE,
  preco_unitario NUMERIC(15,4),
  prazo_entrega_dias INTEGER,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de recebimentos
CREATE TABLE recebimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_compra_id UUID REFERENCES pedidos_compra(id),
  numero_nota_fiscal VARCHAR,
  data_recebimento DATE NOT NULL DEFAULT CURRENT_DATE,
  valor_nota_fiscal NUMERIC(15,2),
  observacoes TEXT,
  recebido_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens recebidos
CREATE TABLE recebimentos_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recebimento_id UUID REFERENCES recebimentos(id) ON DELETE CASCADE,
  pedido_item_id UUID REFERENCES pedidos_compra_itens(id),
  quantidade_recebida NUMERIC(15,3) NOT NULL,
  quantidade_aprovada NUMERIC(15,3),
  quantidade_rejeitada NUMERIC(15,3) DEFAULT 0,
  motivo_rejeicao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar função para gerar número sequencial de pedido
CREATE OR REPLACE FUNCTION gerar_numero_pedido()
RETURNS TRIGGER AS $$
DECLARE
    novo_numero VARCHAR;
    contador INTEGER;
BEGIN
    IF NEW.numero_pedido IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(numero_pedido FROM 3) AS INTEGER)), 0) + 1
        INTO contador
        FROM pedidos_compra
        WHERE numero_pedido ~ '^PC[0-9]+$';
        
        novo_numero := 'PC' || LPAD(contador::text, 6, '0');
        NEW.numero_pedido := novo_numero;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar função para gerar número sequencial de cotação
CREATE OR REPLACE FUNCTION gerar_numero_cotacao()
RETURNS TRIGGER AS $$
DECLARE
    novo_numero VARCHAR;
    contador INTEGER;
BEGIN
    IF NEW.numero_cotacao IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(numero_cotacao FROM 3) AS INTEGER)), 0) + 1
        INTO contador
        FROM cotacoes
        WHERE numero_cotacao ~ '^CT[0-9]+$';
        
        novo_numero := 'CT' || LPAD(contador::text, 6, '0');
        NEW.numero_cotacao := novo_numero;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para numeração automática
CREATE TRIGGER trigger_gerar_numero_pedido
    BEFORE INSERT ON pedidos_compra
    FOR EACH ROW
    EXECUTE FUNCTION gerar_numero_pedido();

CREATE TRIGGER trigger_gerar_numero_cotacao
    BEFORE INSERT ON cotacoes
    FOR EACH ROW
    EXECUTE FUNCTION gerar_numero_cotacao();

-- Criar triggers para updated_at
CREATE TRIGGER trigger_pedidos_compra_updated_at
    BEFORE UPDATE ON pedidos_compra
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_cotacoes_updated_at
    BEFORE UPDATE ON cotacoes
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_cotacoes_fornecedores_updated_at
    BEFORE UPDATE ON cotacoes_fornecedores
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Habilitar RLS nas tabelas
ALTER TABLE pedidos_compra ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_compra_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes_fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes_fornecedores_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE recebimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE recebimentos_itens ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS básicas (usuários autenticados podem acessar)
CREATE POLICY "Authenticated users can manage pedidos_compra" ON pedidos_compra
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage pedidos_compra_itens" ON pedidos_compra_itens
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage cotacoes" ON cotacoes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage cotacoes_fornecedores" ON cotacoes_fornecedores
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage cotacoes_itens" ON cotacoes_itens
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage cotacoes_fornecedores_itens" ON cotacoes_fornecedores_itens
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage recebimentos" ON recebimentos
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage recebimentos_itens" ON recebimentos_itens
    FOR ALL USING (auth.role() = 'authenticated');
