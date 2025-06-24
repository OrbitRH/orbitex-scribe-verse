
-- Criar tabela de unidades de medida
CREATE TABLE public.unidades_medida (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL UNIQUE,
  nome VARCHAR(50) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir unidades básicas para indústria têxtil
INSERT INTO public.unidades_medida (codigo, nome) VALUES 
('UN', 'Unidade'),
('KG', 'Quilograma'),
('MT', 'Metro'),
('M2', 'Metro Quadrado'),
('PC', 'Peça'),
('CX', 'Caixa'),
('RL', 'Rolo'),
('LT', 'Litro'),
('HR', 'Hora');

-- Criar tabela de categorias de produtos
CREATE TABLE public.categorias_produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  categoria_pai_id UUID REFERENCES public.categorias_produtos(id),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir categorias básicas para têxtil
INSERT INTO public.categorias_produtos (nome, descricao) VALUES 
('Matéria-Prima', 'Fios, tecidos, malhas'),
('Aviamentos', 'Botões, zíperes, elásticos'),
('Produtos Acabados', 'Peças prontas para venda'),
('Serviços', 'Serviços industriais'),
('Produtos em Processo', 'Produtos em fase de produção');

-- Criar enum para tipos de empresa
CREATE TYPE public.tipo_empresa AS ENUM ('cliente', 'fornecedor', 'ambos');

-- Criar tabela unificada de empresas (cliente/fornecedor)
CREATE TABLE public.empresas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  razao_social VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(200),
  cnpj_cpf VARCHAR(18) UNIQUE,
  inscricao_estadual VARCHAR(20),
  inscricao_municipal VARCHAR(20),
  tipo_empresa public.tipo_empresa NOT NULL DEFAULT 'ambos',
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  telefone VARCHAR(20),
  email VARCHAR(100),
  contato_principal VARCHAR(100),
  observacoes TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar enum para tipos de produto
CREATE TYPE public.tipo_produto AS ENUM ('materia_prima', 'produto_acabado', 'em_processo', 'aviamento', 'servico');

-- Criar enum para controle de estoque
CREATE TYPE public.controle_estoque AS ENUM ('padrao', 'grade', 'lote');

-- Criar tabela de produtos com estrutura completa
CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_comercial VARCHAR(200) NOT NULL,
  nome_tecnico VARCHAR(200),
  codigo_interno VARCHAR(50) UNIQUE NOT NULL,
  ncm VARCHAR(10),
  cfop_padrao VARCHAR(4),
  tipo_produto public.tipo_produto NOT NULL,
  categoria_id UUID REFERENCES public.categorias_produtos(id),
  unidade_medida_id UUID REFERENCES public.unidades_medida(id) NOT NULL,
  peso_bruto DECIMAL(10,3) DEFAULT 0,
  peso_liquido DECIMAL(10,3) DEFAULT 0,
  comprimento DECIMAL(10,2),
  largura DECIMAL(10,2),
  altura DECIMAL(10,2),
  controle_estoque public.controle_estoque NOT NULL DEFAULT 'padrao',
  possui_ficha_tecnica BOOLEAN NOT NULL DEFAULT false,
  perda_tecnica_percent DECIMAL(5,2) DEFAULT 0,
  tempo_producao_horas DECIMAL(8,2),
  custo_transformacao DECIMAL(10,2),
  preco_medio_compra DECIMAL(10,2),
  preco_sugerido_venda DECIMAL(10,2),
  markup_padrao DECIMAL(5,2),
  controla_lote BOOLEAN NOT NULL DEFAULT false,
  controla_grade BOOLEAN NOT NULL DEFAULT false,
  validade_dias INTEGER,
  observacoes_tecnicas TEXT,
  situacao BOOLEAN NOT NULL DEFAULT true,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de fichas técnicas
CREATE TABLE public.fichas_tecnicas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  versao INTEGER NOT NULL DEFAULT 1,
  descricao TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(produto_id, versao)
);

-- Criar tabela de componentes da ficha técnica
CREATE TABLE public.ficha_tecnica_componentes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ficha_tecnica_id UUID REFERENCES public.fichas_tecnicas(id) ON DELETE CASCADE NOT NULL,
  produto_componente_id UUID REFERENCES public.produtos(id) NOT NULL,
  quantidade DECIMAL(10,4) NOT NULL,
  unidade_medida_id UUID REFERENCES public.unidades_medida(id) NOT NULL,
  perda_percent DECIMAL(5,2) DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de grades de produtos
CREATE TABLE public.produtos_grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  tamanho VARCHAR(20),
  cor VARCHAR(50),
  codigo_grade VARCHAR(50),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de fornecedores homologados
CREATE TABLE public.produtos_fornecedores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  empresa_id UUID REFERENCES public.empresas(id) NOT NULL,
  preco_atual DECIMAL(10,2),
  prazo_entrega_dias INTEGER,
  observacoes TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de histórico de preços
CREATE TABLE public.historico_precos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  empresa_id UUID REFERENCES public.empresas(id),
  tipo_preco VARCHAR(20) NOT NULL, -- 'compra' ou 'venda'
  preco DECIMAL(10,2) NOT NULL,
  data_vigencia DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.unidades_medida ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fichas_tecnicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ficha_tecnica_componentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos_fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_precos ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS básicas (acesso para usuários autenticados)
CREATE POLICY "Usuários autenticados podem acessar unidades_medida" ON public.unidades_medida FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar categorias_produtos" ON public.categorias_produtos FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar empresas" ON public.empresas FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar produtos" ON public.produtos FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar fichas_tecnicas" ON public.fichas_tecnicas FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar ficha_tecnica_componentes" ON public.ficha_tecnica_componentes FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar produtos_grades" ON public.produtos_grades FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar produtos_fornecedores" ON public.produtos_fornecedores FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem acessar historico_precos" ON public.historico_precos FOR ALL TO authenticated USING (true);

-- Criar triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_unidades_medida_updated_at BEFORE UPDATE ON public.unidades_medida FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categorias_produtos_updated_at BEFORE UPDATE ON public.categorias_produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON public.empresas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON public.produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fichas_tecnicas_updated_at BEFORE UPDATE ON public.fichas_tecnicas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_fornecedores_updated_at BEFORE UPDATE ON public.produtos_fornecedores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
