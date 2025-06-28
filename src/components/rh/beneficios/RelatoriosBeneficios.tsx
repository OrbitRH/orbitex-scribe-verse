
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RelatorioBeneficios {
  categoria: string;
  total_colaboradores: number;
  custo_total: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function RelatoriosBeneficios() {
  const [dadosRelatorio, setDadosRelatorio] = useState<RelatorioBeneficios[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMes, setFiltroMes] = useState('');

  useEffect(() => {
    fetchDadosRelatorio();
  }, [filtroMes]);

  const fetchDadosRelatorio = async () => {
    try {
      const { data, error } = await supabase
        .from('colaboradores_beneficios')
        .select(`
          valor_desconto,
          tipo_beneficio:tipos_beneficios(categoria)
        `)
        .eq('ativo', true);

      if (error) throw error;

      // Agrupar dados por categoria
      const agrupado = data?.reduce((acc: any, item: any) => {
        const categoria = item.tipo_beneficio?.categoria || 'outros';
        if (!acc[categoria]) {
          acc[categoria] = { categoria, total_colaboradores: 0, custo_total: 0 };
        }
        acc[categoria].total_colaboradores += 1;
        acc[categoria].custo_total += Number(item.valor_desconto) || 0;
        return acc;
      }, {});

      setDadosRelatorio(Object.values(agrupado || {}));
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
      toast.error('Erro ao carregar relatório');
    } finally {
      setLoading(false);
    }
  };

  const totalColaboradores = dadosRelatorio.reduce((sum, item) => sum + item.total_colaboradores, 0);
  const custoTotal = dadosRelatorio.reduce((sum, item) => sum + item.custo_total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Relatórios de Benefícios</h3>
        <div className="flex items-center space-x-4">
          <Select value={filtroMes} onValueChange={setFiltroMes}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os meses</SelectItem>
              <SelectItem value="01">Janeiro</SelectItem>
              <SelectItem value="02">Fevereiro</SelectItem>
              <SelectItem value="03">Março</SelectItem>
              <SelectItem value="04">Abril</SelectItem>
              <SelectItem value="05">Maio</SelectItem>
              <SelectItem value="06">Junho</SelectItem>
              <SelectItem value="07">Julho</SelectItem>
              <SelectItem value="08">Agosto</SelectItem>
              <SelectItem value="09">Setembro</SelectItem>
              <SelectItem value="10">Outubro</SelectItem>
              <SelectItem value="11">Novembro</SelectItem>
              <SelectItem value="12">Dezembro</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalColaboradores}</div>
            <p className="text-xs text-muted-foreground">
              Com benefícios ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Custo mensal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalColaboradores > 0 ? (custoTotal / totalColaboradores).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Por colaborador
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Colaboradores por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosRelatorio}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_colaboradores" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosRelatorio}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="custo_total"
                >
                  {dadosRelatorio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
