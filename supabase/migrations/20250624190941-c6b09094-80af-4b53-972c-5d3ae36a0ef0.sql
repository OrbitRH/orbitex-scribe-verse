
-- Criar tabela para configurações da empresa
CREATE TABLE public.empresa_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  razao_social VARCHAR NOT NULL,
  nome_fantasia VARCHAR,
  cnpj VARCHAR(18),
  inscricao_estadual VARCHAR,
  inscricao_municipal VARCHAR,
  endereco TEXT,
  cidade VARCHAR,
  estado VARCHAR(2),
  cep VARCHAR(10),
  telefone VARCHAR,
  email VARCHAR,
  site VARCHAR,
  logo_url TEXT,
  regime_tributario VARCHAR DEFAULT 'simples_nacional',
  aliquota_padrao DECIMAL(5,2) DEFAULT 0.00,
  configuracoes_fiscais JSONB DEFAULT '{}',
  parametros_sistema JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela para filiais
CREATE TABLE public.filiais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR NOT NULL UNIQUE,
  nome VARCHAR NOT NULL,
  cnpj VARCHAR(18),
  inscricao_estadual VARCHAR,
  endereco TEXT,
  cidade VARCHAR,
  estado VARCHAR(2),
  cep VARCHAR(10),
  telefone VARCHAR,
  email VARCHAR,
  matriz BOOLEAN DEFAULT FALSE,
  ativo BOOLEAN DEFAULT TRUE,
  configuracoes_especificas JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela para permissões granulares
CREATE TABLE public.permissoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR NOT NULL UNIQUE,
  descricao TEXT,
  modulo VARCHAR NOT NULL,
  acao VARCHAR NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela para roles customizados
CREATE TABLE public.roles_customizados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR NOT NULL UNIQUE,
  descricao TEXT,
  cor VARCHAR DEFAULT '#6B7280',
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela para associar roles com permissões
CREATE TABLE public.roles_permissoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_id UUID REFERENCES public.roles_customizados(id) ON DELETE CASCADE,
  permissao_id UUID REFERENCES public.permissoes(id) ON DELETE CASCADE,
  UNIQUE(role_id, permissao_id)
);

-- Criar tabela para associar usuários com filiais
CREATE TABLE public.usuarios_filiais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  filial_id UUID REFERENCES public.filiais(id) ON DELETE CASCADE,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, filial_id)
);

-- Inserir permissões básicas do sistema
INSERT INTO public.permissoes (nome, descricao, modulo, acao) VALUES
('dashboard.view', 'Visualizar dashboard', 'dashboard', 'view'),
('cadastros.view', 'Visualizar cadastros', 'cadastros', 'view'),
('cadastros.create', 'Criar cadastros', 'cadastros', 'create'),
('cadastros.edit', 'Editar cadastros', 'cadastros', 'edit'),
('cadastros.delete', 'Excluir cadastros', 'cadastros', 'delete'),
('produtos.view', 'Visualizar produtos', 'produtos', 'view'),
('produtos.create', 'Criar produtos', 'produtos', 'create'),
('produtos.edit', 'Editar produtos', 'produtos', 'edit'),
('produtos.delete', 'Excluir produtos', 'produtos', 'delete'),
('empresas.view', 'Visualizar empresas', 'empresas', 'view'),
('empresas.create', 'Criar empresas', 'empresas', 'create'),
('empresas.edit', 'Editar empresas', 'empresas', 'edit'),
('empresas.delete', 'Excluir empresas', 'empresas', 'delete'),
('estoque.view', 'Visualizar estoque', 'estoque', 'view'),
('estoque.edit', 'Editar estoque', 'estoque', 'edit'),
('pcp.view', 'Visualizar PCP', 'pcp', 'view'),
('pcp.edit', 'Editar PCP', 'pcp', 'edit'),
('tarefas.view', 'Visualizar tarefas', 'tarefas', 'view'),
('tarefas.create', 'Criar tarefas', 'tarefas', 'create'),
('tarefas.edit', 'Editar tarefas', 'tarefas', 'edit'),
('tarefas.delete', 'Excluir tarefas', 'tarefas', 'delete'),
('rh.view', 'Visualizar RH', 'rh', 'view'),
('rh.edit', 'Editar RH', 'rh', 'edit'),
('colaboradores.view', 'Visualizar colaboradores', 'colaboradores', 'view'),
('colaboradores.create', 'Criar colaboradores', 'colaboradores', 'create'),
('colaboradores.edit', 'Editar colaboradores', 'colaboradores', 'edit'),
('colaboradores.delete', 'Excluir colaboradores', 'colaboradores', 'delete'),
('financeiro.view', 'Visualizar financeiro', 'financeiro', 'view'),
('financeiro.edit', 'Editar financeiro', 'financeiro', 'edit'),
('comercial.view', 'Visualizar comercial', 'comercial', 'view'),
('comercial.edit', 'Editar comercial', 'comercial', 'edit'),
('relatorios.view', 'Visualizar relatórios', 'relatorios', 'view'),
('fiscal.view', 'Visualizar fiscal', 'fiscal', 'view'),
('fiscal.edit', 'Editar fiscal', 'fiscal', 'edit'),
('configuracoes.view', 'Visualizar configurações', 'configuracoes', 'view'),
('configuracoes.edit', 'Editar configurações', 'configuracoes', 'edit'),
('empresa.view', 'Visualizar configurações da empresa', 'empresa', 'view'),
('empresa.edit', 'Editar configurações da empresa', 'empresa', 'edit'),
('usuarios.view', 'Visualizar usuários', 'usuarios', 'view'),
('usuarios.create', 'Criar usuários', 'usuarios', 'create'),
('usuarios.edit', 'Editar usuários', 'usuarios', 'edit'),
('usuarios.delete', 'Excluir usuários', 'usuarios', 'delete'),
('roles.view', 'Visualizar roles', 'roles', 'view'),
('roles.create', 'Criar roles', 'roles', 'create'),
('roles.edit', 'Editar roles', 'roles', 'edit'),
('roles.delete', 'Excluir roles', 'roles', 'delete');

-- Inserir filial matriz padrão
INSERT INTO public.filiais (codigo, nome, matriz, ativo) VALUES
('MATRIZ', 'Matriz', TRUE, TRUE);

-- Inserir configuração inicial da empresa
INSERT INTO public.empresa_config (razao_social, nome_fantasia) VALUES
('Minha Empresa LTDA', 'Minha Empresa');

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.empresa_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filiais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles_customizados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles_permissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios_filiais ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para empresa_config (apenas admins)
CREATE POLICY "Admins podem gerenciar configurações da empresa"
ON public.empresa_config
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Políticas RLS para filiais (apenas admins e gestores)
CREATE POLICY "Admins e gestores podem ver filiais"
ON public.filiais
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

CREATE POLICY "Admins podem gerenciar filiais"
ON public.filiais
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Políticas RLS para permissões (apenas admins)
CREATE POLICY "Admins podem gerenciar permissões"
ON public.permissoes
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Políticas RLS para roles customizados (apenas admins)
CREATE POLICY "Admins podem gerenciar roles customizados"
ON public.roles_customizados
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Políticas RLS para roles_permissoes (apenas admins)
CREATE POLICY "Admins podem gerenciar associações roles-permissões"
ON public.roles_permissoes
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Políticas RLS para usuarios_filiais
CREATE POLICY "Usuários podem ver suas filiais"
ON public.usuarios_filiais
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins podem gerenciar usuarios-filiais"
ON public.usuarios_filiais
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Trigger para atualizar updated_at
CREATE TRIGGER empresa_config_updated_at
  BEFORE UPDATE ON public.empresa_config
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER filiais_updated_at
  BEFORE UPDATE ON public.filiais
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER roles_customizados_updated_at
  BEFORE UPDATE ON public.roles_customizados
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
