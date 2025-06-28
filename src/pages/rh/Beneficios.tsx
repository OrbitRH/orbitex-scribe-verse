
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Building2, Gift, Users, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BeneficiosGestao } from '@/components/rh/beneficios/BeneficiosGestao';
import { EmpresasBeneficios } from '@/components/rh/beneficios/EmpresasBeneficios';
import { ColaboradoresBeneficios } from '@/components/rh/beneficios/ColaboradoresBeneficios';
import { RelatoriosBeneficios } from '@/components/rh/beneficios/RelatoriosBeneficios';

export default function Beneficios() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBeneficios: 0,
    totalEmpresas: 0,
    colaboradoresAtivos: 0,
    custoMensal: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [beneficios, empresas, colaboradores] = await Promise.all([
          supabase.from('tipos_beneficios').select('*', { count: 'exact' }).eq('ativo', true),
          supabase.from('empresas_beneficios').select('*', { count: 'exact' }).eq('ativo', true),
          supabase.from('colaboradores_beneficios').select('valor_desconto', { count: 'exact' }).eq('ativo', true)
        ]);

        const custoTotal = colaboradores.data?.reduce((sum, item) => sum + (Number(item.valor_desconto) || 0), 0) || 0;

        setStats({
          totalBeneficios: beneficios.count || 0,
          totalEmpresas: empresas.count || 0,
          colaboradoresAtivos: colaboradores.count || 0,
          custoMensal: custoTotal
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Benefícios</h1>
          <p className="text-gray-600">
            Gerencie benefícios, empresas fornecedoras e adesões dos colaboradores
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipos de Benefícios</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBeneficios}</div>
            <p className="text-xs text-muted-foreground">
              Benefícios disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Parceiras</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmpresas}</div>
            <p className="text-xs text-muted-foreground">
              Fornecedores ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.colaboradoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Com benefícios
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Mensal</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.custoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de descontos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="beneficios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="beneficios">Tipos de Benefícios</TabsTrigger>
          <TabsTrigger value="empresas">Empresas Fornecedoras</TabsTrigger>
          <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="beneficios">
          <BeneficiosGestao />
        </TabsContent>

        <TabsContent value="empresas">
          <EmpresasBeneficios />
        </TabsContent>

        <TabsContent value="colaboradores">
          <ColaboradoresBeneficios />
        </TabsContent>

        <TabsContent value="relatorios">
          <RelatoriosBeneficios />
        </TabsContent>
      </Tabs>
    </div>
  );
}
