
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Shield, Heart, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ConveniosGestao } from '@/components/rh/convenios/ConveniosGestao';
import { PlanosConvenios } from '@/components/rh/convenios/PlanosConvenios';
import { ColaboradoresConvenios } from '@/components/rh/convenios/ColaboradoresConvenios';
import { RelatoriosConvenios } from '@/components/rh/convenios/RelatoriosConvenios';

export default function Convenios() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalConvenios: 0,
    totalPlanos: 0,
    colaboradoresAtivos: 0,
    custoMensal: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [convenios, planos, colaboradores] = await Promise.all([
          supabase.from('convenios').select('*', { count: 'exact' }).eq('ativo', true),
          supabase.from('planos_convenios').select('*', { count: 'exact' }).eq('ativo', true),
          supabase.from('colaboradores_convenios').select('valor_mensal', { count: 'exact' }).eq('ativo', true)
        ]);

        const custoTotal = colaboradores.data?.reduce((sum, item) => sum + (Number(item.valor_mensal) || 0), 0) || 0;

        setStats({
          totalConvenios: convenios.count || 0,
          totalPlanos: planos.count || 0,
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
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Convênios</h1>
          <p className="text-gray-600">
            Gerencie convênios médicos, odontológicos e demais parcerias
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convênios Ativos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConvenios}</div>
            <p className="text-xs text-muted-foreground">
              Convênios disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Disponíveis</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlanos}</div>
            <p className="text-xs text-muted-foreground">
              Opções de planos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.colaboradoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Com convênios ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.custoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total dos convênios
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="convenios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="convenios">Convênios</TabsTrigger>
          <TabsTrigger value="planos">Planos</TabsTrigger>
          <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="convenios">
          <ConveniosGestao />
        </TabsContent>

        <TabsContent value="planos">
          <PlanosConvenios />
        </TabsContent>

        <TabsContent value="colaboradores">
          <ColaboradoresConvenios />
        </TabsContent>

        <TabsContent value="relatorios">
          <RelatoriosConvenios />
        </TabsContent>
      </Tabs>
    </div>
  );
}
