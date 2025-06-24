
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Target, Search, Filter, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';

export default function CentrosCusto() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const centrosCusto = [
    {
      id: 1,
      codigo: 'CC001',
      nome: 'Administração',
      descricao: 'Centro de custo administrativo',
      responsavel: 'João Silva',
      status: 'ativo',
      nivel: 1
    },
    {
      id: 2,
      codigo: 'CC002',
      nome: 'Produção',
      descricao: 'Centro de custo de produção',
      responsavel: 'Maria Santos',
      status: 'ativo',
      nivel: 1
    },
    {
      id: 3,
      codigo: 'CC003',
      nome: 'Vendas',
      descricao: 'Centro de custo comercial',
      responsavel: 'Pedro Costa',
      status: 'ativo',
      nivel: 1
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
                <Target className="h-8 w-8 text-purple-600" />
                Centros de Custo
              </h1>
              <p className="text-slate-600 mt-2">
                Gerencie e organize os centros de custo da empresa.
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Centro de Custo
            </Button>
          </div>
        </GlassmorphicCard>

        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lista">Lista de Centros</TabsTrigger>
            <TabsTrigger value="hierarquia">Hierarquia</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <GlassmorphicCard className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center text-slate-800">
                  <Building className="h-5 w-5 mr-2" />
                  Centros de Custo Cadastrados
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os centros de custo da organização.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0">
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por código, nome ou responsável..."
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
                  {centrosCusto.map((centro) => (
                    <GlassmorphicCard key={centro.id} variant="subtle" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {centro.codigo}
                            </span>
                            <h3 className="font-semibold text-slate-800">{centro.nome}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              centro.status === 'ativo' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {centro.status}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-1">{centro.descricao}</p>
                          <p className="text-slate-500 text-xs">Responsável: {centro.responsavel}</p>
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

          <TabsContent value="hierarquia">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <Target className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Hierarquia de Centros</h3>
                <p className="text-slate-500">Visualização hierárquica em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
