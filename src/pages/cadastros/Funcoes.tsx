
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, UserCheck, Search, Filter, Badge } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';

export default function Funcoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('todas');

  const funcoes = [
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend',
      area: 'Tecnologia',
      nivel: 'Pleno',
      salarioBase: 'R$ 8.000,00',
      descricao: 'Desenvolvimento de interfaces web responsivas',
      requisitos: ['React', 'TypeScript', 'CSS'],
      vagas: 2,
      status: 'ativo'
    },
    {
      id: 2,
      titulo: 'Analista de RH',
      area: 'Recursos Humanos',
      nivel: 'Júnior',
      salarioBase: 'R$ 4.500,00',
      descricao: 'Gestão de processos de recrutamento e seleção',
      requisitos: ['Psicologia', 'Comunicação', 'Excel'],
      vagas: 1,
      status: 'ativo'
    },
    {
      id: 3,
      titulo: 'Gerente Comercial',
      area: 'Vendas',
      nivel: 'Sênior',
      salarioBase: 'R$ 12.000,00',
      descricao: 'Liderança da equipe comercial e estratégias de vendas',
      requisitos: ['Liderança', 'Vendas', 'Negociação'],
      vagas: 0,
      status: 'preenchido'
    }
  ];

  const getNivelColor = (nivel: string) => {
    const colors = {
      'Júnior': 'bg-green-100 text-green-700',
      'Pleno': 'bg-blue-100 text-blue-700',
      'Sênior': 'bg-purple-100 text-purple-700'
    };
    return colors[nivel as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassmorphicCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-indigo-600" />
                Funções
              </h1>
              <p className="text-slate-600 mt-2">
                Gerencie cargos e funções organizacionais.
              </p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Função
            </Button>
          </div>
        </GlassmorphicCard>

        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lista">Lista de Funções</TabsTrigger>
            <TabsTrigger value="competencias">Competências</TabsTrigger>
            <TabsTrigger value="niveis">Níveis Salariais</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <GlassmorphicCard className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center text-slate-800">
                  <Badge className="h-5 w-5 mr-2" />
                  Funções Cadastradas
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie todas as funções da organização.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0">
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por título, área ou requisitos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-white/80 border-slate-200/60"
                      />
                    </div>
                  </div>
                  <Select value={filterArea} onValueChange={setFilterArea}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-white/80 border-slate-200/60">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as Áreas</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista */}
                <div className="grid gap-4">
                  {funcoes.map((funcao) => (
                    <GlassmorphicCard key={funcao.id} variant="subtle" className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-semibold text-slate-800">{funcao.titulo}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(funcao.nivel)}`}>
                              {funcao.nivel}
                            </span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {funcao.area}
                            </span>
                          </div>
                          
                          <p className="text-slate-600 text-sm mb-3">{funcao.descricao}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-slate-700">Salário Base:</span>
                              <p className="text-slate-600">{funcao.salarioBase}</p>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Vagas Disponíveis:</span>
                              <p className={`font-medium ${funcao.vagas > 0 ? 'text-green-600' : 'text-slate-500'}`}>
                                {funcao.vagas > 0 ? `${funcao.vagas} vaga(s)` : 'Sem vagas'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Requisitos:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {funcao.requisitos.map((req, index) => (
                                  <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                    {req}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Inativar
                          </Button>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  ))}
                </div>
              </CardContent>
            </GlassmorphicCard>
          </TabsContent>

          <TabsContent value="competencias">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <UserCheck className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Matriz de Competências</h3>
                <p className="text-slate-500">Gestão de competências em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>

          <TabsContent value="niveis">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <Badge className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Estrutura Salarial</h3>
                <p className="text-slate-500">Níveis salariais em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
