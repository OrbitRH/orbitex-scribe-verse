export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      beneficios_empresas: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          empresa_beneficio_id: string | null
          id: string
          percentual_colaborador: number | null
          percentual_empresa: number | null
          tipo_beneficio_id: string | null
          updated_at: string | null
          valor_contratado: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          empresa_beneficio_id?: string | null
          id?: string
          percentual_colaborador?: number | null
          percentual_empresa?: number | null
          tipo_beneficio_id?: string | null
          updated_at?: string | null
          valor_contratado?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          empresa_beneficio_id?: string | null
          id?: string
          percentual_colaborador?: number | null
          percentual_empresa?: number | null
          tipo_beneficio_id?: string | null
          updated_at?: string | null
          valor_contratado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficios_empresas_empresa_beneficio_id_fkey"
            columns: ["empresa_beneficio_id"]
            isOneToOne: false
            referencedRelation: "empresas_beneficios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beneficios_empresas_tipo_beneficio_id_fkey"
            columns: ["tipo_beneficio_id"]
            isOneToOne: false
            referencedRelation: "tipos_beneficios"
            referencedColumns: ["id"]
          },
        ]
      }
      cargos: {
        Row: {
          ativo: boolean | null
          codigo: string | null
          competencias: Json | null
          created_at: string | null
          descricao: string | null
          id: string
          nivel_hierarquico: number | null
          requisitos: string | null
          salario_maximo: number | null
          salario_minimo: number | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          codigo?: string | null
          competencias?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_hierarquico?: number | null
          requisitos?: string | null
          salario_maximo?: number | null
          salario_minimo?: number | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          codigo?: string | null
          competencias?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_hierarquico?: number | null
          requisitos?: string | null
          salario_maximo?: number | null
          salario_minimo?: number | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categorias_produtos: {
        Row: {
          ativo: boolean
          categoria_pai_id: string | null
          created_at: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          categoria_pai_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          categoria_pai_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_produtos_categoria_pai_id_fkey"
            columns: ["categoria_pai_id"]
            isOneToOne: false
            referencedRelation: "categorias_produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores: {
        Row: {
          ativo: boolean | null
          cargo_id: string | null
          centro_custo_id: string | null
          contatos_emergencia: Json | null
          cpf: string | null
          created_at: string | null
          dados_bancarios: Json | null
          data_admissao: string
          data_demissao: string | null
          data_nascimento: string | null
          documentos: Json | null
          email_corporativo: string | null
          email_pessoal: string | null
          endereco_completo: Json | null
          endereco_emergencia: Json | null
          estado_civil: Database["public"]["Enums"]["estado_civil"] | null
          filial_id: string | null
          foto_url: string | null
          gestor_id: string | null
          horario_trabalho_id: string | null
          id: string
          matricula: string | null
          nacionalidade: string | null
          naturalidade: string | null
          nome_completo: string
          observacoes: string | null
          rg: string | null
          salario_base: number | null
          sexo: Database["public"]["Enums"]["sexo"] | null
          status: Database["public"]["Enums"]["status_colaborador"] | null
          telefone_principal: string | null
          telefone_secundario: string | null
          tipo_contrato: Database["public"]["Enums"]["tipo_contrato"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          cargo_id?: string | null
          centro_custo_id?: string | null
          contatos_emergencia?: Json | null
          cpf?: string | null
          created_at?: string | null
          dados_bancarios?: Json | null
          data_admissao: string
          data_demissao?: string | null
          data_nascimento?: string | null
          documentos?: Json | null
          email_corporativo?: string | null
          email_pessoal?: string | null
          endereco_completo?: Json | null
          endereco_emergencia?: Json | null
          estado_civil?: Database["public"]["Enums"]["estado_civil"] | null
          filial_id?: string | null
          foto_url?: string | null
          gestor_id?: string | null
          horario_trabalho_id?: string | null
          id?: string
          matricula?: string | null
          nacionalidade?: string | null
          naturalidade?: string | null
          nome_completo: string
          observacoes?: string | null
          rg?: string | null
          salario_base?: number | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
          status?: Database["public"]["Enums"]["status_colaborador"] | null
          telefone_principal?: string | null
          telefone_secundario?: string | null
          tipo_contrato: Database["public"]["Enums"]["tipo_contrato"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          cargo_id?: string | null
          centro_custo_id?: string | null
          contatos_emergencia?: Json | null
          cpf?: string | null
          created_at?: string | null
          dados_bancarios?: Json | null
          data_admissao?: string
          data_demissao?: string | null
          data_nascimento?: string | null
          documentos?: Json | null
          email_corporativo?: string | null
          email_pessoal?: string | null
          endereco_completo?: Json | null
          endereco_emergencia?: Json | null
          estado_civil?: Database["public"]["Enums"]["estado_civil"] | null
          filial_id?: string | null
          foto_url?: string | null
          gestor_id?: string | null
          horario_trabalho_id?: string | null
          id?: string
          matricula?: string | null
          nacionalidade?: string | null
          naturalidade?: string | null
          nome_completo?: string
          observacoes?: string | null
          rg?: string | null
          salario_base?: number | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
          status?: Database["public"]["Enums"]["status_colaborador"] | null
          telefone_principal?: string | null
          telefone_secundario?: string | null
          tipo_contrato?: Database["public"]["Enums"]["tipo_contrato"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_cargo_id_fkey"
            columns: ["cargo_id"]
            isOneToOne: false
            referencedRelation: "cargos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_horario_trabalho_id_fkey"
            columns: ["horario_trabalho_id"]
            isOneToOne: false
            referencedRelation: "horarios_trabalho"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores_beneficios: {
        Row: {
          ativo: boolean | null
          colaborador_id: string | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string
          id: string
          observacoes: string | null
          tipo_beneficio_id: string | null
          updated_at: string | null
          valor_desconto: number | null
        }
        Insert: {
          ativo?: boolean | null
          colaborador_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio: string
          id?: string
          observacoes?: string | null
          tipo_beneficio_id?: string | null
          updated_at?: string | null
          valor_desconto?: number | null
        }
        Update: {
          ativo?: boolean | null
          colaborador_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string
          id?: string
          observacoes?: string | null
          tipo_beneficio_id?: string | null
          updated_at?: string | null
          valor_desconto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_beneficios_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_beneficios_tipo_beneficio_id_fkey"
            columns: ["tipo_beneficio_id"]
            isOneToOne: false
            referencedRelation: "tipos_beneficios"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores_convenios: {
        Row: {
          ativo: boolean | null
          colaborador_id: string | null
          convenio_id: string | null
          created_at: string | null
          data_adesao: string
          data_cancelamento: string | null
          dependentes: Json | null
          id: string
          numero_carteira: string | null
          observacoes: string | null
          updated_at: string | null
          valor_mensal: number | null
        }
        Insert: {
          ativo?: boolean | null
          colaborador_id?: string | null
          convenio_id?: string | null
          created_at?: string | null
          data_adesao: string
          data_cancelamento?: string | null
          dependentes?: Json | null
          id?: string
          numero_carteira?: string | null
          observacoes?: string | null
          updated_at?: string | null
          valor_mensal?: number | null
        }
        Update: {
          ativo?: boolean | null
          colaborador_id?: string | null
          convenio_id?: string | null
          created_at?: string | null
          data_adesao?: string
          data_cancelamento?: string | null
          dependentes?: Json | null
          id?: string
          numero_carteira?: string | null
          observacoes?: string | null
          updated_at?: string | null
          valor_mensal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_convenios_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_convenios_convenio_id_fkey"
            columns: ["convenio_id"]
            isOneToOne: false
            referencedRelation: "convenios"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores_dependentes: {
        Row: {
          ativo: boolean | null
          colaborador_id: string | null
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          id: string
          nome: string
          parentesco: string
          sexo: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          colaborador_id?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          id?: string
          nome: string
          parentesco: string
          sexo?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          colaborador_id?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          id?: string
          nome?: string
          parentesco?: string
          sexo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_dependentes_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      convenios: {
        Row: {
          ans_registro: string | null
          ativo: boolean | null
          codigo: string | null
          contato: string | null
          created_at: string | null
          descricao: string | null
          email: string | null
          empresa_convenio: string | null
          id: string
          nome: string
          permite_dependentes: boolean | null
          site: string | null
          telefone: string | null
          termos_uso: string | null
          tipo: Database["public"]["Enums"]["tipo_convenio"]
          updated_at: string | null
        }
        Insert: {
          ans_registro?: string | null
          ativo?: boolean | null
          codigo?: string | null
          contato?: string | null
          created_at?: string | null
          descricao?: string | null
          email?: string | null
          empresa_convenio?: string | null
          id?: string
          nome: string
          permite_dependentes?: boolean | null
          site?: string | null
          telefone?: string | null
          termos_uso?: string | null
          tipo: Database["public"]["Enums"]["tipo_convenio"]
          updated_at?: string | null
        }
        Update: {
          ans_registro?: string | null
          ativo?: boolean | null
          codigo?: string | null
          contato?: string | null
          created_at?: string | null
          descricao?: string | null
          email?: string | null
          empresa_convenio?: string | null
          id?: string
          nome?: string
          permite_dependentes?: boolean | null
          site?: string | null
          telefone?: string | null
          termos_uso?: string | null
          tipo?: Database["public"]["Enums"]["tipo_convenio"]
          updated_at?: string | null
        }
        Relationships: []
      }
      cotacoes: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_limite_resposta: string
          data_solicitacao: string
          descricao: string | null
          id: string
          numero_cotacao: string
          observacoes: string | null
          status: Database["public"]["Enums"]["status_cotacao"]
          titulo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_limite_resposta: string
          data_solicitacao?: string
          descricao?: string | null
          id?: string
          numero_cotacao: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_cotacao"]
          titulo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_limite_resposta?: string
          data_solicitacao?: string
          descricao?: string | null
          id?: string
          numero_cotacao?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_cotacao"]
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cotacoes_fornecedores: {
        Row: {
          cotacao_id: string | null
          created_at: string | null
          data_resposta: string | null
          empresa_fornecedor_id: string | null
          id: string
          observacoes_fornecedor: string | null
          status: Database["public"]["Enums"]["status_cotacao"]
          updated_at: string | null
          valor_total: number | null
        }
        Insert: {
          cotacao_id?: string | null
          created_at?: string | null
          data_resposta?: string | null
          empresa_fornecedor_id?: string | null
          id?: string
          observacoes_fornecedor?: string | null
          status?: Database["public"]["Enums"]["status_cotacao"]
          updated_at?: string | null
          valor_total?: number | null
        }
        Update: {
          cotacao_id?: string | null
          created_at?: string | null
          data_resposta?: string | null
          empresa_fornecedor_id?: string | null
          id?: string
          observacoes_fornecedor?: string | null
          status?: Database["public"]["Enums"]["status_cotacao"]
          updated_at?: string | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cotacoes_fornecedores_cotacao_id_fkey"
            columns: ["cotacao_id"]
            isOneToOne: false
            referencedRelation: "cotacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotacoes_fornecedores_empresa_fornecedor_id_fkey"
            columns: ["empresa_fornecedor_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      cotacoes_fornecedores_itens: {
        Row: {
          cotacao_fornecedor_id: string | null
          cotacao_item_id: string | null
          created_at: string | null
          id: string
          observacoes: string | null
          prazo_entrega_dias: number | null
          preco_unitario: number | null
        }
        Insert: {
          cotacao_fornecedor_id?: string | null
          cotacao_item_id?: string | null
          created_at?: string | null
          id?: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          preco_unitario?: number | null
        }
        Update: {
          cotacao_fornecedor_id?: string | null
          cotacao_item_id?: string | null
          created_at?: string | null
          id?: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          preco_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cotacoes_fornecedores_itens_cotacao_fornecedor_id_fkey"
            columns: ["cotacao_fornecedor_id"]
            isOneToOne: false
            referencedRelation: "cotacoes_fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotacoes_fornecedores_itens_cotacao_item_id_fkey"
            columns: ["cotacao_item_id"]
            isOneToOne: false
            referencedRelation: "cotacoes_itens"
            referencedColumns: ["id"]
          },
        ]
      }
      cotacoes_itens: {
        Row: {
          cotacao_id: string | null
          created_at: string | null
          especificacoes: string | null
          id: string
          produto_id: string | null
          quantidade: number
        }
        Insert: {
          cotacao_id?: string | null
          created_at?: string | null
          especificacoes?: string | null
          id?: string
          produto_id?: string | null
          quantidade: number
        }
        Update: {
          cotacao_id?: string | null
          created_at?: string | null
          especificacoes?: string | null
          id?: string
          produto_id?: string | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "cotacoes_itens_cotacao_id_fkey"
            columns: ["cotacao_id"]
            isOneToOne: false
            referencedRelation: "cotacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotacoes_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa_config: {
        Row: {
          aliquota_padrao: number | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          configuracoes_fiscais: Json | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          logo_url: string | null
          nome_fantasia: string | null
          parametros_sistema: Json | null
          razao_social: string
          regime_tributario: string | null
          site: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          aliquota_padrao?: number | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          configuracoes_fiscais?: Json | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logo_url?: string | null
          nome_fantasia?: string | null
          parametros_sistema?: Json | null
          razao_social: string
          regime_tributario?: string | null
          site?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          aliquota_padrao?: number | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          configuracoes_fiscais?: Json | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logo_url?: string | null
          nome_fantasia?: string | null
          parametros_sistema?: Json | null
          razao_social?: string
          regime_tributario?: string | null
          site?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      empresas: {
        Row: {
          ativo: boolean
          cep: string | null
          cidade: string | null
          cnpj_cpf: string | null
          contato_principal: string | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          nome_fantasia: string | null
          observacoes: string | null
          razao_social: string
          telefone: string | null
          tipo_empresa: Database["public"]["Enums"]["tipo_empresa"]
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          cep?: string | null
          cidade?: string | null
          cnpj_cpf?: string | null
          contato_principal?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_fantasia?: string | null
          observacoes?: string | null
          razao_social: string
          telefone?: string | null
          tipo_empresa?: Database["public"]["Enums"]["tipo_empresa"]
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          cep?: string | null
          cidade?: string | null
          cnpj_cpf?: string | null
          contato_principal?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_fantasia?: string | null
          observacoes?: string | null
          razao_social?: string
          telefone?: string | null
          tipo_empresa?: Database["public"]["Enums"]["tipo_empresa"]
          updated_at?: string
        }
        Relationships: []
      }
      empresas_beneficios: {
        Row: {
          ativo: boolean | null
          cnpj: string | null
          contato_responsavel: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          razao_social: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cnpj?: string | null
          contato_responsavel?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cnpj?: string | null
          contato_responsavel?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ficha_tecnica_componentes: {
        Row: {
          created_at: string
          ficha_tecnica_id: string
          id: string
          observacoes: string | null
          perda_percent: number | null
          produto_componente_id: string
          quantidade: number
          unidade_medida_id: string
        }
        Insert: {
          created_at?: string
          ficha_tecnica_id: string
          id?: string
          observacoes?: string | null
          perda_percent?: number | null
          produto_componente_id: string
          quantidade: number
          unidade_medida_id: string
        }
        Update: {
          created_at?: string
          ficha_tecnica_id?: string
          id?: string
          observacoes?: string | null
          perda_percent?: number | null
          produto_componente_id?: string
          quantidade?: number
          unidade_medida_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ficha_tecnica_componentes_ficha_tecnica_id_fkey"
            columns: ["ficha_tecnica_id"]
            isOneToOne: false
            referencedRelation: "fichas_tecnicas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ficha_tecnica_componentes_produto_componente_id_fkey"
            columns: ["produto_componente_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ficha_tecnica_componentes_unidade_medida_id_fkey"
            columns: ["unidade_medida_id"]
            isOneToOne: false
            referencedRelation: "unidades_medida"
            referencedColumns: ["id"]
          },
        ]
      }
      fichas_tecnicas: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          produto_id: string
          updated_at: string
          versao: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          produto_id: string
          updated_at?: string
          versao?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          produto_id?: string
          updated_at?: string
          versao?: number
        }
        Relationships: [
          {
            foreignKeyName: "fichas_tecnicas_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      filiais: {
        Row: {
          ativo: boolean | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          codigo: string
          configuracoes_especificas: Json | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          inscricao_estadual: string | null
          matriz: boolean | null
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          codigo: string
          configuracoes_especificas?: Json | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          matriz?: boolean | null
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          codigo?: string
          configuracoes_especificas?: Json | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          matriz?: boolean | null
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      historico_precos: {
        Row: {
          created_at: string
          data_vigencia: string
          empresa_id: string | null
          id: string
          observacoes: string | null
          preco: number
          produto_id: string
          tipo_preco: string
        }
        Insert: {
          created_at?: string
          data_vigencia: string
          empresa_id?: string | null
          id?: string
          observacoes?: string | null
          preco: number
          produto_id: string
          tipo_preco: string
        }
        Update: {
          created_at?: string
          data_vigencia?: string
          empresa_id?: string | null
          id?: string
          observacoes?: string | null
          preco?: number
          produto_id?: string
          tipo_preco?: string
        }
        Relationships: [
          {
            foreignKeyName: "historico_precos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_precos_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios_trabalho: {
        Row: {
          ativo: boolean | null
          carga_horaria_semanal: number | null
          configuracao: Json | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          tipo: Database["public"]["Enums"]["tipo_horario"]
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          carga_horaria_semanal?: number | null
          configuracao?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          tipo: Database["public"]["Enums"]["tipo_horario"]
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          carga_horaria_semanal?: number | null
          configuracao?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: Database["public"]["Enums"]["tipo_horario"]
          updated_at?: string | null
        }
        Relationships: []
      }
      justificativas_ponto: {
        Row: {
          anexos: Json | null
          aprovado_por: string | null
          colaborador_id: string | null
          created_at: string | null
          data_aprovacao: string | null
          id: string
          motivo: string
          registro_ponto_id: string | null
          status: Database["public"]["Enums"]["status_aprovacao"] | null
          tipo: Database["public"]["Enums"]["tipo_justificativa"]
          updated_at: string | null
        }
        Insert: {
          anexos?: Json | null
          aprovado_por?: string | null
          colaborador_id?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          id?: string
          motivo: string
          registro_ponto_id?: string | null
          status?: Database["public"]["Enums"]["status_aprovacao"] | null
          tipo: Database["public"]["Enums"]["tipo_justificativa"]
          updated_at?: string | null
        }
        Update: {
          anexos?: Json | null
          aprovado_por?: string | null
          colaborador_id?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          id?: string
          motivo?: string
          registro_ponto_id?: string | null
          status?: Database["public"]["Enums"]["status_aprovacao"] | null
          tipo?: Database["public"]["Enums"]["tipo_justificativa"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "justificativas_ponto_aprovado_por_fkey"
            columns: ["aprovado_por"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "justificativas_ponto_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "justificativas_ponto_registro_ponto_id_fkey"
            columns: ["registro_ponto_id"]
            isOneToOne: false
            referencedRelation: "registros_ponto"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_compra: {
        Row: {
          aprovado_por: string | null
          condicoes_pagamento: string | null
          created_at: string | null
          created_by: string | null
          data_aprovacao: string | null
          data_entrega_prevista: string | null
          data_pedido: string
          desconto_total: number | null
          empresa_fornecedor_id: string | null
          id: string
          numero_pedido: string
          observacoes: string | null
          prazo_entrega_dias: number | null
          status: Database["public"]["Enums"]["status_pedido_compra"]
          updated_at: string | null
          valor_frete: number | null
          valor_total: number | null
        }
        Insert: {
          aprovado_por?: string | null
          condicoes_pagamento?: string | null
          created_at?: string | null
          created_by?: string | null
          data_aprovacao?: string | null
          data_entrega_prevista?: string | null
          data_pedido?: string
          desconto_total?: number | null
          empresa_fornecedor_id?: string | null
          id?: string
          numero_pedido: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          status?: Database["public"]["Enums"]["status_pedido_compra"]
          updated_at?: string | null
          valor_frete?: number | null
          valor_total?: number | null
        }
        Update: {
          aprovado_por?: string | null
          condicoes_pagamento?: string | null
          created_at?: string | null
          created_by?: string | null
          data_aprovacao?: string | null
          data_entrega_prevista?: string | null
          data_pedido?: string
          desconto_total?: number | null
          empresa_fornecedor_id?: string | null
          id?: string
          numero_pedido?: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          status?: Database["public"]["Enums"]["status_pedido_compra"]
          updated_at?: string | null
          valor_frete?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_compra_empresa_fornecedor_id_fkey"
            columns: ["empresa_fornecedor_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_compra_itens: {
        Row: {
          created_at: string | null
          desconto_percentual: number | null
          id: string
          observacoes: string | null
          pedido_compra_id: string | null
          preco_unitario: number
          produto_id: string | null
          quantidade: number
          valor_total: number
        }
        Insert: {
          created_at?: string | null
          desconto_percentual?: number | null
          id?: string
          observacoes?: string | null
          pedido_compra_id?: string | null
          preco_unitario: number
          produto_id?: string | null
          quantidade: number
          valor_total: number
        }
        Update: {
          created_at?: string | null
          desconto_percentual?: number | null
          id?: string
          observacoes?: string | null
          pedido_compra_id?: string | null
          preco_unitario?: number
          produto_id?: string | null
          quantidade?: number
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_compra_itens_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      permissoes: {
        Row: {
          acao: string
          ativo: boolean | null
          created_at: string
          descricao: string | null
          id: string
          modulo: string
          nome: string
        }
        Insert: {
          acao: string
          ativo?: boolean | null
          created_at?: string
          descricao?: string | null
          id?: string
          modulo: string
          nome: string
        }
        Update: {
          acao?: string
          ativo?: boolean | null
          created_at?: string
          descricao?: string | null
          id?: string
          modulo?: string
          nome?: string
        }
        Relationships: []
      }
      planos_convenios: {
        Row: {
          abrangencia: string | null
          ativo: boolean | null
          carencia_dias: number | null
          cobertura: string | null
          codigo: string | null
          convenio_id: string | null
          created_at: string | null
          id: string
          nome: string
          updated_at: string | null
          valor_coparticipacao: number | null
          valor_mensal: number | null
        }
        Insert: {
          abrangencia?: string | null
          ativo?: boolean | null
          carencia_dias?: number | null
          cobertura?: string | null
          codigo?: string | null
          convenio_id?: string | null
          created_at?: string | null
          id?: string
          nome: string
          updated_at?: string | null
          valor_coparticipacao?: number | null
          valor_mensal?: number | null
        }
        Update: {
          abrangencia?: string | null
          ativo?: boolean | null
          carencia_dias?: number | null
          cobertura?: string | null
          codigo?: string | null
          convenio_id?: string | null
          created_at?: string | null
          id?: string
          nome?: string
          updated_at?: string | null
          valor_coparticipacao?: number | null
          valor_mensal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "planos_convenios_convenio_id_fkey"
            columns: ["convenio_id"]
            isOneToOne: false
            referencedRelation: "convenios"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          altura: number | null
          categoria_id: string | null
          cfop_padrao: string | null
          codigo_interno: string
          comprimento: number | null
          controla_grade: boolean
          controla_lote: boolean
          controle_estoque: Database["public"]["Enums"]["controle_estoque"]
          created_at: string
          custo_transformacao: number | null
          descricao: string | null
          id: string
          largura: number | null
          markup_padrao: number | null
          ncm: string | null
          nome_comercial: string
          nome_tecnico: string | null
          observacoes_tecnicas: string | null
          perda_tecnica_percent: number | null
          peso_bruto: number | null
          peso_liquido: number | null
          possui_ficha_tecnica: boolean
          preco_medio_compra: number | null
          preco_sugerido_venda: number | null
          situacao: boolean
          tempo_producao_horas: number | null
          tipo_produto: Database["public"]["Enums"]["tipo_produto"]
          unidade_medida_id: string
          updated_at: string
          validade_dias: number | null
        }
        Insert: {
          altura?: number | null
          categoria_id?: string | null
          cfop_padrao?: string | null
          codigo_interno: string
          comprimento?: number | null
          controla_grade?: boolean
          controla_lote?: boolean
          controle_estoque?: Database["public"]["Enums"]["controle_estoque"]
          created_at?: string
          custo_transformacao?: number | null
          descricao?: string | null
          id?: string
          largura?: number | null
          markup_padrao?: number | null
          ncm?: string | null
          nome_comercial: string
          nome_tecnico?: string | null
          observacoes_tecnicas?: string | null
          perda_tecnica_percent?: number | null
          peso_bruto?: number | null
          peso_liquido?: number | null
          possui_ficha_tecnica?: boolean
          preco_medio_compra?: number | null
          preco_sugerido_venda?: number | null
          situacao?: boolean
          tempo_producao_horas?: number | null
          tipo_produto: Database["public"]["Enums"]["tipo_produto"]
          unidade_medida_id: string
          updated_at?: string
          validade_dias?: number | null
        }
        Update: {
          altura?: number | null
          categoria_id?: string | null
          cfop_padrao?: string | null
          codigo_interno?: string
          comprimento?: number | null
          controla_grade?: boolean
          controla_lote?: boolean
          controle_estoque?: Database["public"]["Enums"]["controle_estoque"]
          created_at?: string
          custo_transformacao?: number | null
          descricao?: string | null
          id?: string
          largura?: number | null
          markup_padrao?: number | null
          ncm?: string | null
          nome_comercial?: string
          nome_tecnico?: string | null
          observacoes_tecnicas?: string | null
          perda_tecnica_percent?: number | null
          peso_bruto?: number | null
          peso_liquido?: number | null
          possui_ficha_tecnica?: boolean
          preco_medio_compra?: number | null
          preco_sugerido_venda?: number | null
          situacao?: boolean
          tempo_producao_horas?: number | null
          tipo_produto?: Database["public"]["Enums"]["tipo_produto"]
          unidade_medida_id?: string
          updated_at?: string
          validade_dias?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_unidade_medida_id_fkey"
            columns: ["unidade_medida_id"]
            isOneToOne: false
            referencedRelation: "unidades_medida"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos_fornecedores: {
        Row: {
          ativo: boolean
          created_at: string
          empresa_id: string
          id: string
          observacoes: string | null
          prazo_entrega_dias: number | null
          preco_atual: number | null
          produto_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          empresa_id: string
          id?: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          preco_atual?: number | null
          produto_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          empresa_id?: string
          id?: string
          observacoes?: string | null
          prazo_entrega_dias?: number | null
          preco_atual?: number | null
          produto_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_fornecedores_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_fornecedores_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos_grades: {
        Row: {
          ativo: boolean
          codigo_grade: string | null
          cor: string | null
          created_at: string
          id: string
          produto_id: string
          tamanho: string | null
        }
        Insert: {
          ativo?: boolean
          codigo_grade?: string | null
          cor?: string | null
          created_at?: string
          id?: string
          produto_id: string
          tamanho?: string | null
        }
        Update: {
          ativo?: boolean
          codigo_grade?: string | null
          cor?: string | null
          created_at?: string
          id?: string
          produto_id?: string
          tamanho?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_grades_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recebimentos: {
        Row: {
          created_at: string | null
          data_recebimento: string
          id: string
          numero_nota_fiscal: string | null
          observacoes: string | null
          pedido_compra_id: string | null
          recebido_por: string | null
          valor_nota_fiscal: number | null
        }
        Insert: {
          created_at?: string | null
          data_recebimento?: string
          id?: string
          numero_nota_fiscal?: string | null
          observacoes?: string | null
          pedido_compra_id?: string | null
          recebido_por?: string | null
          valor_nota_fiscal?: number | null
        }
        Update: {
          created_at?: string | null
          data_recebimento?: string
          id?: string
          numero_nota_fiscal?: string | null
          observacoes?: string | null
          pedido_compra_id?: string | null
          recebido_por?: string | null
          valor_nota_fiscal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recebimentos_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      recebimentos_itens: {
        Row: {
          created_at: string | null
          id: string
          motivo_rejeicao: string | null
          pedido_item_id: string | null
          quantidade_aprovada: number | null
          quantidade_recebida: number
          quantidade_rejeitada: number | null
          recebimento_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          motivo_rejeicao?: string | null
          pedido_item_id?: string | null
          quantidade_aprovada?: number | null
          quantidade_recebida: number
          quantidade_rejeitada?: number | null
          recebimento_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          motivo_rejeicao?: string | null
          pedido_item_id?: string | null
          quantidade_aprovada?: number | null
          quantidade_recebida?: number
          quantidade_rejeitada?: number | null
          recebimento_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recebimentos_itens_pedido_item_id_fkey"
            columns: ["pedido_item_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra_itens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recebimentos_itens_recebimento_id_fkey"
            columns: ["recebimento_id"]
            isOneToOne: false
            referencedRelation: "recebimentos"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_ponto: {
        Row: {
          aprovado_por: string | null
          colaborador_id: string | null
          created_at: string | null
          data: string
          data_aprovacao: string | null
          entrada_manha: string | null
          entrada_tarde: string | null
          horas_extras: number | null
          horas_trabalhadas: number | null
          id: string
          observacoes: string | null
          saida_almoco: string | null
          saida_noite: string | null
          tipo_registro:
            | Database["public"]["Enums"]["tipo_registro_ponto"]
            | null
          updated_at: string | null
        }
        Insert: {
          aprovado_por?: string | null
          colaborador_id?: string | null
          created_at?: string | null
          data: string
          data_aprovacao?: string | null
          entrada_manha?: string | null
          entrada_tarde?: string | null
          horas_extras?: number | null
          horas_trabalhadas?: number | null
          id?: string
          observacoes?: string | null
          saida_almoco?: string | null
          saida_noite?: string | null
          tipo_registro?:
            | Database["public"]["Enums"]["tipo_registro_ponto"]
            | null
          updated_at?: string | null
        }
        Update: {
          aprovado_por?: string | null
          colaborador_id?: string | null
          created_at?: string | null
          data?: string
          data_aprovacao?: string | null
          entrada_manha?: string | null
          entrada_tarde?: string | null
          horas_extras?: number | null
          horas_trabalhadas?: number | null
          id?: string
          observacoes?: string | null
          saida_almoco?: string | null
          saida_noite?: string | null
          tipo_registro?:
            | Database["public"]["Enums"]["tipo_registro_ponto"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registros_ponto_aprovado_por_fkey"
            columns: ["aprovado_por"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registros_ponto_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      regras_aprovacao_compras: {
        Row: {
          aprovador_id: string | null
          ativo: boolean | null
          created_at: string | null
          departamento: string | null
          id: string
          ordem_aprovacao: number | null
          valor_maximo: number | null
          valor_minimo: number | null
        }
        Insert: {
          aprovador_id?: string | null
          ativo?: boolean | null
          created_at?: string | null
          departamento?: string | null
          id?: string
          ordem_aprovacao?: number | null
          valor_maximo?: number | null
          valor_minimo?: number | null
        }
        Update: {
          aprovador_id?: string | null
          ativo?: boolean | null
          created_at?: string | null
          departamento?: string | null
          id?: string
          ordem_aprovacao?: number | null
          valor_maximo?: number | null
          valor_minimo?: number | null
        }
        Relationships: []
      }
      roles_customizados: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles_permissoes: {
        Row: {
          id: string
          permissao_id: string | null
          role_id: string | null
        }
        Insert: {
          id?: string
          permissao_id?: string | null
          role_id?: string | null
        }
        Update: {
          id?: string
          permissao_id?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_permissoes_permissao_id_fkey"
            columns: ["permissao_id"]
            isOneToOne: false
            referencedRelation: "permissoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_permissoes_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles_customizados"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitacoes_compra: {
        Row: {
          aprovado_por: string | null
          created_at: string | null
          data_aprovacao: string | null
          data_necessidade: string | null
          departamento_solicitante: string
          id: string
          justificativa: string
          numero_solicitacao: string
          observacoes: string | null
          prioridade: Database["public"]["Enums"]["prioridade_tarefa"]
          solicitante_id: string | null
          status: Database["public"]["Enums"]["status_tarefa"]
          supervisor_id: string | null
          updated_at: string | null
          valor_estimado: number | null
        }
        Insert: {
          aprovado_por?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_necessidade?: string | null
          departamento_solicitante: string
          id?: string
          justificativa: string
          numero_solicitacao: string
          observacoes?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          solicitante_id?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          supervisor_id?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Update: {
          aprovado_por?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_necessidade?: string | null
          departamento_solicitante?: string
          id?: string
          justificativa?: string
          numero_solicitacao?: string
          observacoes?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          solicitante_id?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          supervisor_id?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Relationships: []
      }
      solicitacoes_compra_itens: {
        Row: {
          created_at: string | null
          descricao_item: string
          especificacoes: string | null
          id: string
          produto_id: string | null
          quantidade: number
          solicitacao_id: string | null
          urgente: boolean | null
          valor_estimado_unitario: number | null
        }
        Insert: {
          created_at?: string | null
          descricao_item: string
          especificacoes?: string | null
          id?: string
          produto_id?: string | null
          quantidade: number
          solicitacao_id?: string | null
          urgente?: boolean | null
          valor_estimado_unitario?: number | null
        }
        Update: {
          created_at?: string | null
          descricao_item?: string
          especificacoes?: string | null
          id?: string
          produto_id?: string | null
          quantidade?: number
          solicitacao_id?: string | null
          urgente?: boolean | null
          valor_estimado_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitacoes_compra_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitacoes_compra_itens_solicitacao_id_fkey"
            columns: ["solicitacao_id"]
            isOneToOne: false
            referencedRelation: "solicitacoes_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas_compras: {
        Row: {
          cotacao_id: string | null
          created_at: string | null
          data_conclusao: string | null
          data_inicio: string | null
          departamento_origem: string | null
          descricao: string | null
          id: string
          numero_tarefa: string
          observacoes: string | null
          pedido_compra_id: string | null
          prazo_limite: string | null
          prioridade: Database["public"]["Enums"]["prioridade_tarefa"]
          recebimento_id: string | null
          responsavel_id: string | null
          solicitacao_compra_id: string | null
          solicitante_id: string | null
          status: Database["public"]["Enums"]["status_tarefa"]
          tempo_estimado_horas: number | null
          tempo_gasto_horas: number | null
          tipo_tarefa: Database["public"]["Enums"]["tipo_tarefa_compra"]
          titulo: string
          updated_at: string | null
        }
        Insert: {
          cotacao_id?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          data_inicio?: string | null
          departamento_origem?: string | null
          descricao?: string | null
          id?: string
          numero_tarefa: string
          observacoes?: string | null
          pedido_compra_id?: string | null
          prazo_limite?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          recebimento_id?: string | null
          responsavel_id?: string | null
          solicitacao_compra_id?: string | null
          solicitante_id?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          tempo_estimado_horas?: number | null
          tempo_gasto_horas?: number | null
          tipo_tarefa: Database["public"]["Enums"]["tipo_tarefa_compra"]
          titulo: string
          updated_at?: string | null
        }
        Update: {
          cotacao_id?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          data_inicio?: string | null
          departamento_origem?: string | null
          descricao?: string | null
          id?: string
          numero_tarefa?: string
          observacoes?: string | null
          pedido_compra_id?: string | null
          prazo_limite?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          recebimento_id?: string | null
          responsavel_id?: string | null
          solicitacao_compra_id?: string | null
          solicitante_id?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          tempo_estimado_horas?: number | null
          tempo_gasto_horas?: number | null
          tipo_tarefa?: Database["public"]["Enums"]["tipo_tarefa_compra"]
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_compras_cotacao_id_fkey"
            columns: ["cotacao_id"]
            isOneToOne: false
            referencedRelation: "cotacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_compras_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_compras_recebimento_id_fkey"
            columns: ["recebimento_id"]
            isOneToOne: false
            referencedRelation: "recebimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_compras_solicitacao_compra_id_fkey"
            columns: ["solicitacao_compra_id"]
            isOneToOne: false
            referencedRelation: "solicitacoes_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      tipos_beneficios: {
        Row: {
          ativo: boolean | null
          categoria: Database["public"]["Enums"]["categoria_beneficio"]
          codigo: string | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          obrigatorio: boolean | null
          periodicidade: string | null
          permite_dependentes: boolean | null
          tipo_desconto: Database["public"]["Enums"]["tipo_desconto"]
          updated_at: string | null
          valor_desconto: number | null
          valor_empresa: number | null
        }
        Insert: {
          ativo?: boolean | null
          categoria: Database["public"]["Enums"]["categoria_beneficio"]
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          obrigatorio?: boolean | null
          periodicidade?: string | null
          permite_dependentes?: boolean | null
          tipo_desconto: Database["public"]["Enums"]["tipo_desconto"]
          updated_at?: string | null
          valor_desconto?: number | null
          valor_empresa?: number | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: Database["public"]["Enums"]["categoria_beneficio"]
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          obrigatorio?: boolean | null
          periodicidade?: string | null
          permite_dependentes?: boolean | null
          tipo_desconto?: Database["public"]["Enums"]["tipo_desconto"]
          updated_at?: string | null
          valor_desconto?: number | null
          valor_empresa?: number | null
        }
        Relationships: []
      }
      unidades_medida: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      usuarios_filiais: {
        Row: {
          ativo: boolean | null
          created_at: string
          filial_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          filial_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          filial_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_filiais_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_compras_historico: {
        Row: {
          dados_adicionais: Json | null
          data_transicao: string | null
          etapa_destino:
            | Database["public"]["Enums"]["tipo_tarefa_compra"]
            | null
          etapa_origem: Database["public"]["Enums"]["tipo_tarefa_compra"] | null
          id: string
          observacoes: string | null
          tarefa_id: string | null
          usuario_id: string | null
        }
        Insert: {
          dados_adicionais?: Json | null
          data_transicao?: string | null
          etapa_destino?:
            | Database["public"]["Enums"]["tipo_tarefa_compra"]
            | null
          etapa_origem?:
            | Database["public"]["Enums"]["tipo_tarefa_compra"]
            | null
          id?: string
          observacoes?: string | null
          tarefa_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          dados_adicionais?: Json | null
          data_transicao?: string | null
          etapa_destino?:
            | Database["public"]["Enums"]["tipo_tarefa_compra"]
            | null
          etapa_origem?:
            | Database["public"]["Enums"]["tipo_tarefa_compra"]
            | null
          id?: string
          observacoes?: string | null
          tarefa_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_compras_historico_tarefa_id_fkey"
            columns: ["tarefa_id"]
            isOneToOne: false
            referencedRelation: "tarefas_compras"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "gestor" | "colaborador" | "rh" | "financeiro"
      categoria_beneficio:
        | "saude"
        | "alimentacao"
        | "transporte"
        | "educacao"
        | "outros"
      controle_estoque: "padrao" | "grade" | "lote"
      estado_civil:
        | "solteiro"
        | "casado"
        | "divorciado"
        | "viuvo"
        | "uniao_estavel"
      prioridade_tarefa: "baixa" | "media" | "alta" | "urgente"
      sexo: "masculino" | "feminino" | "outros"
      status_aprovacao: "pendente" | "aprovado" | "rejeitado"
      status_colaborador:
        | "ativo"
        | "inativo"
        | "ferias"
        | "licenca"
        | "afastado"
      status_cotacao:
        | "pendente"
        | "respondida"
        | "aceita"
        | "rejeitada"
        | "expirada"
      status_pedido_compra:
        | "rascunho"
        | "pendente_aprovacao"
        | "aprovado"
        | "enviado"
        | "recebido_parcial"
        | "recebido_total"
        | "cancelado"
      status_tarefa:
        | "pendente"
        | "em_andamento"
        | "aguardando"
        | "concluida"
        | "cancelada"
      tipo_centro_custo:
        | "operacional"
        | "administrativo"
        | "comercial"
        | "producao"
      tipo_contrato: "clt" | "pj" | "estagiario" | "terceirizado" | "temporario"
      tipo_convenio:
        | "medico"
        | "odontologico"
        | "farmacia"
        | "educacao"
        | "outros"
      tipo_desconto: "percentual" | "valor_fixo" | "sem_desconto"
      tipo_documento_compra: "orcamento" | "cotacao" | "pedido"
      tipo_empresa: "cliente" | "fornecedor" | "ambos"
      tipo_horario: "fixo" | "flexivel" | "home_office" | "hibrido"
      tipo_justificativa:
        | "atraso"
        | "falta"
        | "saida_antecipada"
        | "horas_extras"
      tipo_produto:
        | "materia_prima"
        | "produto_acabado"
        | "em_processo"
        | "aviamento"
        | "servico"
      tipo_registro_ponto:
        | "normal"
        | "falta"
        | "falta_justificada"
        | "ferias"
        | "licenca"
        | "feriado"
      tipo_tarefa_compra:
        | "solicitacao"
        | "cotacao"
        | "aprovacao"
        | "pedido"
        | "acompanhamento"
        | "recebimento"
        | "conferencia_nf"
        | "financeiro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "gestor", "colaborador", "rh", "financeiro"],
      categoria_beneficio: [
        "saude",
        "alimentacao",
        "transporte",
        "educacao",
        "outros",
      ],
      controle_estoque: ["padrao", "grade", "lote"],
      estado_civil: [
        "solteiro",
        "casado",
        "divorciado",
        "viuvo",
        "uniao_estavel",
      ],
      prioridade_tarefa: ["baixa", "media", "alta", "urgente"],
      sexo: ["masculino", "feminino", "outros"],
      status_aprovacao: ["pendente", "aprovado", "rejeitado"],
      status_colaborador: ["ativo", "inativo", "ferias", "licenca", "afastado"],
      status_cotacao: [
        "pendente",
        "respondida",
        "aceita",
        "rejeitada",
        "expirada",
      ],
      status_pedido_compra: [
        "rascunho",
        "pendente_aprovacao",
        "aprovado",
        "enviado",
        "recebido_parcial",
        "recebido_total",
        "cancelado",
      ],
      status_tarefa: [
        "pendente",
        "em_andamento",
        "aguardando",
        "concluida",
        "cancelada",
      ],
      tipo_centro_custo: [
        "operacional",
        "administrativo",
        "comercial",
        "producao",
      ],
      tipo_contrato: ["clt", "pj", "estagiario", "terceirizado", "temporario"],
      tipo_convenio: [
        "medico",
        "odontologico",
        "farmacia",
        "educacao",
        "outros",
      ],
      tipo_desconto: ["percentual", "valor_fixo", "sem_desconto"],
      tipo_documento_compra: ["orcamento", "cotacao", "pedido"],
      tipo_empresa: ["cliente", "fornecedor", "ambos"],
      tipo_horario: ["fixo", "flexivel", "home_office", "hibrido"],
      tipo_justificativa: [
        "atraso",
        "falta",
        "saida_antecipada",
        "horas_extras",
      ],
      tipo_produto: [
        "materia_prima",
        "produto_acabado",
        "em_processo",
        "aviamento",
        "servico",
      ],
      tipo_registro_ponto: [
        "normal",
        "falta",
        "falta_justificada",
        "ferias",
        "licenca",
        "feriado",
      ],
      tipo_tarefa_compra: [
        "solicitacao",
        "cotacao",
        "aprovacao",
        "pedido",
        "acompanhamento",
        "recebimento",
        "conferencia_nf",
        "financeiro",
      ],
    },
  },
} as const
