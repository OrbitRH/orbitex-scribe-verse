
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DadosPessoaisSection } from './sections/DadosPessoaisSection';
import { DadosProfissionaisSection } from './sections/DadosProfissionaisSection';
import { EnderecoSection } from './sections/EnderecoSection';
import { ContatosSection } from './sections/ContatosSection';
import { DocumentosSection } from './sections/DocumentosSection';
import { BeneficiosSection } from './sections/BeneficiosSection';
import { ConveniosSection } from './sections/ConveniosSection';
import { ProgressIndicator } from '@/components/products/components/ProgressIndicator';
import { User, Briefcase, MapPin, Phone, FileText, Gift, Shield } from 'lucide-react';

const colaboradorSchema = z.object({
  nome_completo: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  rg: z.string().optional(),
  data_nascimento: z.string().optional(),
  estado_civil: z.enum(['solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel']).optional(),
  sexo: z.enum(['masculino', 'feminino', 'outros']).optional(),
  nacionalidade: z.string().optional(),
  naturalidade: z.string().optional(),
  email_pessoal: z.string().email('Email inválido').optional().or(z.literal('')),
  email_corporativo: z.string().email('Email corporativo inválido').optional().or(z.literal('')),
  telefone_principal: z.string().optional(),
  telefone_secundario: z.string().optional(),
  data_admissao: z.string().min(1, 'Data de admissão é obrigatória'),
  tipo_contrato: z.enum(['clt', 'pj', 'estagiario', 'terceirizado', 'temporario']),
  salario_base: z.number().optional(),
  cargo_id: z.string().optional(),
  status: z.enum(['ativo', 'inativo', 'ferias', 'licenca', 'afastado']).default('ativo'),
  endereco_completo: z.object({
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    cep: z.string().optional(),
  }).optional(),
  observacoes: z.string().optional(),
});

type ColaboradorFormData = z.infer<typeof colaboradorSchema>;

interface ColaboradorFormProps {
  colaborador?: Partial<ColaboradorFormData>;
  onSubmit: (data: ColaboradorFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const formSections = [
  { id: 'pessoais', label: 'Dados Pessoais', icon: User },
  { id: 'profissionais', label: 'Dados Profissionais', icon: Briefcase },
  { id: 'endereco', label: 'Endereço', icon: MapPin },
  { id: 'contatos', label: 'Contatos', icon: Phone },
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'beneficios', label: 'Benefícios', icon: Gift },
  { id: 'convenios', label: 'Convênios', icon: Shield },
];

export function ColaboradorForm({ colaborador, onSubmit, onCancel, isLoading }: ColaboradorFormProps) {
  const [currentSection, setCurrentSection] = useState('pessoais');
  
  const form = useForm<ColaboradorFormData>({
    resolver: zodResolver(colaboradorSchema),
    defaultValues: {
      nome_completo: '',
      status: 'ativo',
      tipo_contrato: 'clt',
      endereco_completo: {},
      ...colaborador,
    },
  });

  const currentSectionIndex = formSections.findIndex(section => section.id === currentSection);
  const progress = ((currentSectionIndex + 1) / formSections.length) * 100;

  const handleNext = () => {
    const nextIndex = Math.min(currentSectionIndex + 1, formSections.length - 1);
    setCurrentSection(formSections[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentSectionIndex - 1, 0);
    setCurrentSection(formSections[prevIndex].id);
  };

  const handleSubmit = (data: ColaboradorFormData) => {
    console.log('Dados do colaborador:', data);
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header com progresso */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
              <User className="h-7 w-7 text-blue-600" />
              {colaborador ? 'Editar Colaborador' : 'Novo Colaborador'}
            </CardTitle>
            <ProgressIndicator 
              current={currentSectionIndex + 1} 
              total={formSections.length}
              className="mt-4"
            />
          </CardHeader>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs value={currentSection} onValueChange={setCurrentSection}>
              <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm">
                {formSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex flex-col items-center gap-1 py-3 text-xs"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{section.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardContent className="p-6">
                  <TabsContent value="pessoais" className="mt-0">
                    <DadosPessoaisSection form={form} />
                  </TabsContent>

                  <TabsContent value="profissionais" className="mt-0">
                    <DadosProfissionaisSection form={form} />
                  </TabsContent>

                  <TabsContent value="endereco" className="mt-0">
                    <EnderecoSection form={form} />
                  </TabsContent>

                  <TabsContent value="contatos" className="mt-0">
                    <ContatosSection form={form} />
                  </TabsContent>

                  <TabsContent value="documentos" className="mt-0">
                    <DocumentosSection form={form} />
                  </TabsContent>

                  <TabsContent value="beneficios" className="mt-0">
                    <BeneficiosSection form={form} />
                  </TabsContent>

                  <TabsContent value="convenios" className="mt-0">
                    <ConveniosSection form={form} />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>

            {/* Navegação */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      disabled={currentSectionIndex === 0}
                    >
                      Anterior
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleNext}
                      disabled={currentSectionIndex === formSections.length - 1}
                    >
                      Próximo
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                      {isLoading ? 'Salvando...' : 'Salvar Colaborador'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
