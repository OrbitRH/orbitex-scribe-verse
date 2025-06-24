
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '../types/ProductFormData';
import { Package } from 'lucide-react';

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormData>;
  categorias: any[];
  unidades: any[];
}

export default function BasicInfoSection({ form, categorias, unidades }: BasicInfoSectionProps) {
  const tiposProduto = [
    { value: 'materia_prima', label: 'Matéria-Prima', description: 'Materiais brutos utilizados na produção' },
    { value: 'produto_acabado', label: 'Produto Acabado', description: 'Produtos finais prontos para venda' },
    { value: 'em_processo', label: 'Em Processo', description: 'Produtos em fase de produção' },
    { value: 'aviamento', label: 'Aviamento', description: 'Acessórios e componentes auxiliares' },
    { value: 'servico', label: 'Serviço', description: 'Serviços prestados pela empresa' },
  ];

  return (
    <div className="space-y-6">
      {/* Identificação do Produto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Identificação do Produto
          </CardTitle>
          <CardDescription>
            Informações básicas para identificação do produto no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nome_comercial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Nome Comercial <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite o nome do produto" 
                      {...field} 
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Nome que aparecerá nas vendas e relatórios
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigo_interno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Código Interno <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Código único do produto" 
                      {...field} 
                      className="h-9"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Código único para identificação interna
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nome_tecnico"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Nome Técnico</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome técnico ou científico (opcional)" 
                    {...field} 
                    className="h-9"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Denominação técnica para especificações
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descrição detalhada do produto..."
                    className="min-h-[80px] resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Descrição completa que aparecerá em relatórios e documentos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Classificação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Classificação</CardTitle>
          <CardDescription>
            Categoria e tipo do produto para organização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="tipo_produto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Tipo de Produto <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione o tipo do produto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposProduto.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        <div>
                          <div className="font-medium">{tipo.label}</div>
                          <div className="text-xs text-muted-foreground">{tipo.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Classifica o produto para controles específicos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoria_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    Agrupa produtos similares
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unidade_medida_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Unidade de Medida <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unidades.map((unidade) => (
                        <SelectItem key={unidade.id} value={unidade.id}>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm">{unidade.codigo}</span>
                            <span>-</span>
                            <span>{unidade.nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    Unidade padrão para estoque e vendas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
