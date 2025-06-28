
-- Criar tabela para empresas fornecedoras de benefícios
CREATE TABLE IF NOT EXISTS empresas_beneficios (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR NOT NULL,
    cnpj VARCHAR,
    razao_social VARCHAR,
    telefone VARCHAR,
    email VARCHAR,
    endereco TEXT,
    contato_responsavel VARCHAR,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para planos de convênios
CREATE TABLE IF NOT EXISTS planos_convenios (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    convenio_id UUID REFERENCES convenios(id),
    nome VARCHAR NOT NULL,
    codigo VARCHAR,
    valor_mensal NUMERIC(10,2),
    valor_coparticipacao NUMERIC(10,2),
    carencia_dias INTEGER DEFAULT 0,
    abrangencia TEXT,
    cobertura TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para dependentes dos colaboradores
CREATE TABLE IF NOT EXISTS colaboradores_dependentes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    colaborador_id UUID REFERENCES colaboradores(id),
    nome VARCHAR NOT NULL,
    parentesco VARCHAR NOT NULL,
    cpf VARCHAR,
    data_nascimento DATE,
    sexo VARCHAR,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para associar benefícios com empresas fornecedoras
CREATE TABLE IF NOT EXISTS beneficios_empresas (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tipo_beneficio_id UUID REFERENCES tipos_beneficios(id),
    empresa_beneficio_id UUID REFERENCES empresas_beneficios(id),
    valor_contratado NUMERIC(10,2),
    percentual_empresa NUMERIC(5,2),
    percentual_colaborador NUMERIC(5,2),
    data_inicio DATE,
    data_fim DATE,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar campos nas tabelas existentes
ALTER TABLE tipos_beneficios 
ADD COLUMN IF NOT EXISTS codigo VARCHAR,
ADD COLUMN IF NOT EXISTS periodicidade VARCHAR DEFAULT 'mensal',
ADD COLUMN IF NOT EXISTS permite_dependentes BOOLEAN DEFAULT false;

ALTER TABLE convenios
ADD COLUMN IF NOT EXISTS codigo VARCHAR,
ADD COLUMN IF NOT EXISTS ans_registro VARCHAR,
ADD COLUMN IF NOT EXISTS permite_dependentes BOOLEAN DEFAULT false;

-- Criar triggers para updated_at nas novas tabelas
CREATE TRIGGER update_empresas_beneficios_updated_at 
    BEFORE UPDATE ON empresas_beneficios 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planos_convenios_updated_at 
    BEFORE UPDATE ON planos_convenios 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_colaboradores_dependentes_updated_at 
    BEFORE UPDATE ON colaboradores_dependentes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beneficios_empresas_updated_at 
    BEFORE UPDATE ON beneficios_empresas 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
