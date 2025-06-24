
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Building2, Search, Filter, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';

export default function Setores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const setores = [
    {
      id: 1,
      nome: 'Recursos Humanos',
      codigo: 'RH',
      descricao: 'Gestão de pessoas e talentos',
      gerente: 'Ana Silva',
      localizacao: 'Térreo - Sala 101',
      colaboradores: 8,
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Tecnologia da Informação',
      codigo: 'TI',
      descricao: 'Infraestrutura e desenvolvimento',
      gerente: 'Carlos Oliveira',
      localizacao: '2º Andar - Sala 201',
      colaboradores: 12,
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Financeiro',
      codigo: 'FIN',
      descricao: 'Controladoria e finanças',
      gerente: 'Marina Costa',
      localizacao: '1º Andar - Sala 105',
      colaboradores: 6,
      status: 'ativo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassmorphicCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Building2 className="h-8 w-8 text-orange-600" />
                Setores
              </h1>
              <p className="text-slate-600 mt-2">
                Gerencie os departamentos e divisões da empresa.
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Setor
            </Button>
          </div>
        </GlassmorphicCard>

        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lista">Lista de Setores</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <GlassmorphicCard className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center text-slate-800">
                  <Users className="h-5 w-5 mr-2" />
                  Setores Cadastrados
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os setores da organização.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0">
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nome, código ou gerente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-white/80 border-slate-200/60"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-white/80 border-slate-200/60">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ativo">Ativos</SelectItem>
                      <SelectItem value="inativo">Inativos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista */}
                <div className="grid gap-4">
                  {setores.map((setor) => (
                    <GlassmorphicCard key={setor.id} variant="subtle" className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
                              {setor.codigo}
                            </span>
                            <h3 className="font-semibold text-slate-800">{setor.nome}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              setor.status === 'ativo' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {setor.status}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{setor.descricao}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500">
                            <div>
                              <span className="font-medium">Gerente:</span> {setor.gerente}
                            </div>
                            <div>
                              <span className="font-medium">Localização:</span> {setor.localizacao}
                            </div>
                            <div>
                              <span className="font-medium">Colaboradores:</span> {setor.colaboradores}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
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

          <TabsContent value="relatorios">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Relatórios de Setores</h3>
                <p className="text-slate-500">Relatórios gerenciais em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
