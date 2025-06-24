
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';
import { ColaboradorCard } from '@/components/rh/ColaboradorCard';
import { ColaboradorFormModal } from '@/components/rh/ColaboradorFormModal';
import { 
  Plus, 
  Users, 
  Search, 
  Filter, 
  Download,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState<any[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchColaboradores = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('colaboradores')
        .select(`
          *,
          cargo:cargos(titulo),
          filial:filiais(nome)
        `)
        .order('nome_completo');

      if (error) throw error;
      
      setColaboradores(data || []);
      setFilteredColaboradores(data || []);
    } catch (error) {
      console.error('Erro ao carregar colaboradores:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os colaboradores.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  useEffect(() => {
    let filtered = colaboradores;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(colaborador =>
        colaborador.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colaborador.matricula?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colaborador.cpf?.includes(searchTerm)
      );
    }

    // Filtro por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(colaborador => colaborador.status === statusFilter);
    }

    setFilteredColaboradores(filtered);
  }, [colaboradores, searchTerm, statusFilter]);

  const handleEditColaborador = (colaborador: any) => {
    setSelectedColaborador(colaborador);
    setIsFormModalOpen(true);
  };

  const handleViewColaborador = (colaborador: any) => {
    // Implementar modal de visualização
    console.log('Visualizar colaborador:', colaborador);
  };

  const handleFormSuccess = () => {
    fetchColaboradores();
    toast({
      title: 'Sucesso',
      description: 'Colaborador salvo com sucesso!',
    });
  };

  const stats = {
    total: colaboradores.length,
    ativos: colaboradores.filter(c => c.status === 'ativo').length,
    inativos: colaboradores.filter(c => c.status === 'inativo').length,
    ferias: colaboradores.filter(c => c.status === 'ferias').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassmorphicCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                Colaboradores
              </h1>
              <p className="text-slate-600 mt-2">
                Gerencie o cadastro completo de funcionários da empresa.
              </p>
            </div>
            <Button 
              onClick={() => {
                setSelectedColaborador(null);
                setIsFormModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Colaborador
            </Button>
          </div>
        </GlassmorphicCard>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassmorphicCard className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-sm text-slate-600">Total Colaboradores</p>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.ativos}</p>
                <p className="text-sm text-slate-600">Ativos</p>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.ferias}</p>
                <p className="text-sm text-slate-600">Em Férias</p>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.inativos}</p>
                <p className="text-sm text-slate-600">Inativos</p>
              </div>
            </div>
          </GlassmorphicCard>
        </div>

        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lista">Lista de Colaboradores</TabsTrigger>
            <TabsTrigger value="organograma">Organograma</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <GlassmorphicCard className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center text-slate-800">
                  <Users className="h-5 w-5 mr-2" />
                  Colaboradores Cadastrados
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os colaboradores cadastrados com informações completas.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0">
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nome, matrícula ou CPF..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-white/80 border-slate-200/60"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-white/80 border-slate-200/60">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="ativo">Ativos</SelectItem>
                      <SelectItem value="inativo">Inativos</SelectItem>
                      <SelectItem value="ferias">Em Férias</SelectItem>
                      <SelectItem value="licenca">Em Licença</SelectItem>
                      <SelectItem value="afastado">Afastados</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="bg-white/80 border-slate-200/60">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>

                {/* Lista de colaboradores */}
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-slate-500 mt-2">Carregando colaboradores...</p>
                  </div>
                ) : filteredColaboradores.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      {searchTerm || statusFilter !== 'todos' 
                        ? 'Nenhum colaborador encontrado' 
                        : 'Nenhum colaborador cadastrado ainda.'
                      }
                    </h3>
                    <p className="text-slate-500 mb-4">
                      {searchTerm || statusFilter !== 'todos' 
                        ? 'Tente ajustar os filtros de busca.' 
                        : 'Clique em "Novo Colaborador" para começar.'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'todos' && (
                      <Button 
                        onClick={() => setIsFormModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Colaborador
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredColaboradores.map((colaborador) => (
                      <ColaboradorCard
                        key={colaborador.id}
                        colaborador={colaborador}
                        onEdit={() => handleEditColaborador(colaborador)}
                        onView={() => handleViewColaborador(colaborador)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </GlassmorphicCard>
          </TabsContent>

          <TabsContent value="organograma">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Organograma em Desenvolvimento</h3>
                <p className="text-slate-500">
                  Visualização hierárquica da estrutura organizacional será implementada em breve.
                </p>
              </div>
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>

        {/* Modal do formulário */}
        <ColaboradorFormModal
          isOpen={isFormModalOpen}
          onOpenChange={setIsFormModalOpen}
          colaborador={selectedColaborador}
          onSuccess={handleFormSuccess}
        />
      </div>
    </div>
  );
}
