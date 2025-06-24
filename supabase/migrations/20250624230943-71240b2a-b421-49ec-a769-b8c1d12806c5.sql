
-- Criar enum para status do colaborador
CREATE TYPE status_colaborador AS ENUM ('ativo', 'inativo', 'ferias', 'licenca', 'afastado');

-- Criar enum para tipo de contrato
CREATE TYPE tipo_contrato AS ENUM ('clt', 'pj', 'estagiario', 'terceirizado', 'temporario');

-- Criar enum para estado civil
CREATE TYPE estado_civil AS ENUM ('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel');

-- Criar enum para sexo
CREATE TYPE sexo AS ENUM ('masculino', 'feminino', 'outros');

-- Criar enum para tipo de centro de custo
CREATE TYPE tipo_centro_custo AS ENUM ('operacional', 'administrativo', 'comercial', 'producao');

-- Criar enum para tipo de horário
CREATE TYPE tipo_horario AS ENUM ('fixo', 'flexivel', 'home_office', 'hibrido');

-- Criar enum para categoria de benefícios
CREATE TYPE categoria_beneficio AS ENUM ('saude', 'alimentacao', 'transporte', 'educacao', 'outros');

-- Criar enum para tipo de desconto
CREATE TYPE tipo_desconto AS ENUM ('percentual', 'valor_fixo', 'sem_desconto');

-- Criar enum para tipo de convênio
CREATE TYPE tipo_convenio AS ENUM ('medico', 'odontologico', 'farmacia', 'educacao', 'outros');

-- Criar enum para tipo de registro de ponto
CREATE TYPE tipo_registro_ponto AS ENUM ('normal', 'falta', 'falta_justificada', 'ferias', 'licenca', 'feriado');

-- Criar enum para tipo de justificativa
CREATE TYPE tipo_justificativa AS ENUM ('atraso', 'falta', 'saida_antecipada', 'horas_extras');

-- Criar enum para status de aprovação
CREATE TYPE status_aprovacao AS ENUM ('pendente', 'aprovado', 'rejeitado');

-- Tabela de horários de trabalho
CREATE TABLE horarios_trabalho (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR NOT NULL,
    descricao TEXT,
    carga_horaria_semanal NUMERIC,
    configuracao JSONB,
    tipo tipo_horario NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de cargos
CREATE TABLE cargos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR NOT NULL,
    codigo VARCHAR UNIQUE,
    descricao TEXT,
    nivel_hierarquico INTEGER,
    salario_minimo NUMERIC,
    salario_maximo NUMERIC,
    requisitos TEXT,
    competencias JSONB,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de colaboradores
CREATE TABLE colaboradores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    matricula VARCHAR UNIQUE,
    nome_completo VARCHAR NOT NULL,
    cpf VARCHAR UNIQUE,
    rg VARCHAR,
    data_nascimento DATE,
    estado_civil estado_civil,
    sexo sexo,
    nacionalidade VARCHAR,
    naturalidade VARCHAR,
    email_pessoal VARCHAR,
    email_corporativo VARCHAR,
    telefone_principal VARCHAR,
    telefone_secundario VARCHAR,
    endereco_completo JSONB,
    endereco_emergencia JSONB,
    data_admissao DATE NOT NULL,
    data_demissao DATE,
    status status_colaborador DEFAULT 'ativo',
    tipo_contrato tipo_contrato NOT NULL,
    salario_base NUMERIC,
    cargo_id UUID REFERENCES cargos(id),
    centro_custo_id UUID,
    filial_id UUID REFERENCES filiais(id),
    gestor_id UUID REFERENCES colaboradores(id),
    horario_trabalho_id UUID REFERENCES horarios_trabalho(id),
    observacoes TEXT,
    foto_url TEXT,
    documentos JSONB,
    dados_bancarios JSONB,
    contatos_emergencia JSONB,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de tipos de benefícios
CREATE TABLE tipos_beneficios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR NOT NULL,
    descricao TEXT,
    categoria categoria_beneficio NOT NULL,
    tipo_desconto tipo_desconto NOT NULL,
    valor_desconto NUMERIC,
    valor_empresa NUMERIC,
    obrigatorio BOOLEAN DEFAULT false,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de colaboradores benefícios
CREATE TABLE colaboradores_beneficios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    colaborador_id UUID REFERENCES colaboradores(id) ON DELETE CASCADE,
    tipo_beneficio_id UUID REFERENCES tipos_beneficios(id),
    data_inicio DATE NOT NULL,
    data_fim DATE,
    valor_desconto NUMERIC,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de convênios
CREATE TABLE convenios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR NOT NULL,
    tipo tipo_convenio NOT NULL,
    empresa_convenio VARCHAR,
    contato VARCHAR,
    telefone VARCHAR,
    email VARCHAR,
    site VARCHAR,
    descricao TEXT,
    termos_uso TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de colaboradores convênios
CREATE TABLE colaboradores_convenios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    colaborador_id UUID REFERENCES colaboradores(id) ON DELETE CASCADE,
    convenio_id UUID REFERENCES convenios(id),
    numero_carteira VARCHAR,
    data_adesao DATE NOT NULL,
    data_cancelamento DATE,
    dependentes JSONB,
    valor_mensal NUMERIC,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de registros de ponto
CREATE TABLE registros_ponto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    colaborador_id UUID REFERENCES colaboradores(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    entrada_manha TIME,
    saida_almoco TIME,
    entrada_tarde TIME,
    saida_noite TIME,
    horas_trabalhadas NUMERIC,
    horas_extras NUMERIC,
    tipo_registro tipo_registro_ponto DEFAULT 'normal',
    observacoes TEXT,
    aprovado_por UUID REFERENCES colaboradores(id),
    data_aprovacao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(colaborador_id, data)
);

-- Tabela de justificativas de ponto
CREATE TABLE justificativas_ponto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registro_ponto_id UUID REFERENCES registros_ponto(id) ON DELETE CASCADE,
    colaborador_id UUID REFERENCES colaboradores(id),
    tipo tipo_justificativa NOT NULL,
    motivo TEXT NOT NULL,
    anexos JSONB,
    status status_aprovacao DEFAULT 'pendente',
    aprovado_por UUID REFERENCES colaboradores(id),
    data_aprovacao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Função para gerar matrícula sequencial
CREATE OR REPLACE FUNCTION gerar_matricula()
RETURNS TRIGGER AS $$
DECLARE
    nova_matricula VARCHAR;
    contador INTEGER;
BEGIN
    IF NEW.matricula IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(matricula FROM 4) AS INTEGER)), 0) + 1
        INTO contador
        FROM colaboradores
        WHERE matricula ~ '^COL[0-9]+$';
        
        nova_matricula := 'COL' || LPAD(contador::text, 6, '0');
        NEW.matricula := nova_matricula;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar matrícula automaticamente
CREATE TRIGGER trigger_gerar_matricula
    BEFORE INSERT ON colaboradores
    FOR EACH ROW
    EXECUTE FUNCTION gerar_matricula();

-- Triggers para updated_at
CREATE TRIGGER handle_updated_at_horarios_trabalho
    BEFORE UPDATE ON horarios_trabalho
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_cargos
    BEFORE UPDATE ON cargos
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_colaboradores
    BEFORE UPDATE ON colaboradores
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_tipos_beneficios
    BEFORE UPDATE ON tipos_beneficios
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_colaboradores_beneficios
    BEFORE UPDATE ON colaboradores_beneficios
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_convenios
    BEFORE UPDATE ON convenios
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_colaboradores_convenios
    BEFORE UPDATE ON colaboradores_convenios
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_registros_ponto
    BEFORE UPDATE ON registros_ponto
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_justificativas_ponto
    BEFORE UPDATE ON justificativas_ponto
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Índices para performance
CREATE INDEX idx_colaboradores_status ON colaboradores(status);
CREATE INDEX idx_colaboradores_data_admissao ON colaboradores(data_admissao);
CREATE INDEX idx_colaboradores_cargo_id ON colaboradores(cargo_id);
CREATE INDEX idx_colaboradores_gestor_id ON colaboradores(gestor_id);
CREATE INDEX idx_registros_ponto_colaborador_data ON registros_ponto(colaborador_id, data);
CREATE INDEX idx_justificativas_ponto_status ON justificativas_ponto(status);

-- Inserir dados iniciais para horários de trabalho
INSERT INTO horarios_trabalho (nome, descricao, carga_horaria_semanal, configuracao, tipo) VALUES
('Horário Comercial', 'Segunda a sexta, 8h às 18h', 44, '{"segunda": {"entrada": "08:00", "saida_almoco": "12:00", "entrada_tarde": "13:00", "saida": "18:00"}, "terca": {"entrada": "08:00", "saida_almoco": "12:00", "entrada_tarde": "13:00", "saida": "18:00"}, "quarta": {"entrada": "08:00", "saida_almoco": "12:00", "entrada_tarde": "13:00", "saida": "18:00"}, "quinta": {"entrada": "08:00", "saida_almoco": "12:00", "entrada_tarde": "13:00", "saida": "18:00"}, "sexta": {"entrada": "08:00", "saida_almoco": "12:00", "entrada_tarde": "13:00", "saida": "18:00"}}', 'fixo'),
('Horário Flexível', 'Horário flexível com 8h diárias', 40, '{"flexivel": true, "horas_diarias": 8, "horario_core": {"inicio": "10:00", "fim": "16:00"}}', 'flexivel'),
('Home Office', 'Trabalho remoto', 40, '{"remoto": true, "horas_diarias": 8}', 'home_office');

-- Inserir dados iniciais para cargos
INSERT INTO cargos (titulo, codigo, descricao, nivel_hierarquico, salario_minimo, salario_maximo) VALUES
('Analista de RH', 'ANL-RH', 'Responsável por atividades de recursos humanos', 3, 3000.00, 5000.00),
('Desenvolvedor Frontend', 'DEV-FE', 'Desenvolvimento de interfaces de usuário', 3, 4000.00, 8000.00),
('Gerente de Projetos', 'GER-PRJ', 'Gestão e coordenação de projetos', 4, 6000.00, 12000.00),
('Diretor Geral', 'DIR-GER', 'Direção geral da empresa', 5, 15000.00, 30000.00);

-- Inserir dados iniciais para tipos de benefícios
INSERT INTO tipos_beneficios (nome, descricao, categoria, tipo_desconto, valor_desconto, valor_empresa) VALUES
('Vale Refeição', 'Auxílio alimentação diário', 'alimentacao', 'percentual', 20.00, 25.00),
('Plano de Saúde', 'Plano de saúde empresarial', 'saude', 'percentual', 30.00, 250.00),
('Vale Transporte', 'Auxílio transporte público', 'transporte', 'percentual', 6.00, 0.00),
('Seguro de Vida', 'Seguro de vida em grupo', 'outros', 'sem_desconto', 0.00, 50.00);

-- Inserir dados iniciais para convênios
INSERT INTO convenios (nome, tipo, empresa_convenio, descricao) VALUES
('Unimed', 'medico', 'Unimed Cooperativa Médica', 'Plano de saúde médico completo'),
('Odontoprev', 'odontologico', 'Odontoprev S.A.', 'Plano odontológico empresarial'),
('Farmácia Popular', 'farmacia', 'Rede Farmácia Popular', 'Desconto em medicamentos'),
('Estácio', 'educacao', 'Universidade Estácio', 'Desconto em cursos superiores');
