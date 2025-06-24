export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      controle_estoque: "padrao" | "grade" | "lote"
      tipo_empresa: "cliente" | "fornecedor" | "ambos"
      tipo_produto:
        | "materia_prima"
        | "produto_acabado"
        | "em_processo"
        | "aviamento"
        | "servico"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "gestor", "colaborador", "rh", "financeiro"],
      controle_estoque: ["padrao", "grade", "lote"],
      tipo_empresa: ["cliente", "fornecedor", "ambos"],
      tipo_produto: [
        "materia_prima",
        "produto_acabado",
        "em_processo",
        "aviamento",
        "servico",
      ],
    },
  },
} as const
