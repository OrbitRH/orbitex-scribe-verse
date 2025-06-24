
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, Download, ZoomIn, ZoomOut, RotateCcw, Edit } from 'lucide-react';
import { GlassmorphicCard } from '@/components/products/components/GlassmorphicCard';

export default function Organograma() {
  const [zoomLevel, setZoomLevel] = useState(100);

  const orgData = {
    ceo: {
      nome: 'João Silva',
      cargo: 'CEO',
      departamento: 'Executivo'
    },
    diretores: [
      {
        nome: 'Maria Santos',
        cargo: 'Diretora de RH',
        departamento: 'Recursos Humanos',
        subordinados: 8
      },
      {
        nome: 'Pedro Costa',
        cargo: 'Diretor de TI',
        departamento: 'Tecnologia',
        subordinados: 12
      },
      {
        nome: 'Ana Oliveira',
        cargo: 'Diretora Financeira',
        departamento: 'Financeiro',
        subordinados: 6
      }
    ]
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleReset = () => {
    setZoomLevel(100);
  };

  const handleExport = () => {
    // Implementar exportação
    console.log('Exportando organograma...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-blue-50/40 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassmorphicCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Network className="h-8 w-8 text-teal-600" />
                Organograma
              </h1>
              <p className="text-slate-600 mt-2">
                Visualize e gerencie a estrutura hierárquica da organização.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </GlassmorphicCard>

        <Tabs defaultValue="visualizacao" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualizacao">Visualização</TabsTrigger>
            <TabsTrigger value="configuracao">Configuração</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="visualizacao">
            <GlassmorphicCard className="p-6">
              {/* Controles de Zoom */}
              <div className="flex items-center justify-between mb-6 p-4 bg-white/50 rounded-lg border border-slate-200/60">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">Zoom:</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 50}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-mono bg-white px-3 py-1 rounded border">
                      {zoomLevel}%
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 200}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resetar
                </Button>
              </div>

              {/* Organograma Simplificado */}
              <div 
                className="bg-white/30 rounded-lg border-2 border-dashed border-slate-300 p-8 overflow-auto"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
              >
                <div className="flex flex-col items-center space-y-8">
                  {/* CEO */}
                  <GlassmorphicCard variant="elevated" className="p-4 text-center">
                    <div className="w-32">
                      <h3 className="font-semibold text-slate-800">{orgData.ceo.nome}</h3>
                      <p className="text-sm text-slate-600">{orgData.ceo.cargo}</p>
                      <p className="text-xs text-slate-500">{orgData.ceo.departamento}</p>
                    </div>
                  </GlassmorphicCard>

                  {/* Linha conectora */}
                  <div className="w-px h-8 bg-slate-300"></div>

                  {/* Diretores */}
                  <div className="flex items-start justify-center space-x-8">
                    {orgData.diretores.map((diretor, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <GlassmorphicCard variant="elevated" className="p-4 text-center">
                          <div className="w-32">
                            <h4 className="font-semibold text-slate-800">{diretor.nome}</h4>
                            <p className="text-sm text-slate-600">{diretor.cargo}</p>
                            <p className="text-xs text-slate-500">{diretor.departamento}</p>
                            <p className="text-xs text-teal-600 mt-1">
                              {diretor.subordinados} subordinados
                            </p>
                          </div>
                        </GlassmorphicCard>

                        {/* Linha para subordinados */}
                        <div className="w-px h-6 bg-slate-300 mt-2"></div>
                        <div className="text-xs text-slate-500 bg-white/70 px-2 py-1 rounded">
                          {diretor.subordinados} pessoas
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legenda */}
              <div className="mt-6 p-4 bg-white/50 rounded-lg border border-slate-200/60">
                <h4 className="font-medium text-slate-700 mb-2">Legenda:</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-100 border border-teal-300 rounded"></div>
                    <span className="text-slate-600">Executivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                    <span className="text-slate-600">Diretoria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-100 border border-slate-300 rounded"></div>
                    <span className="text-slate-600">Subordinados</span>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </TabsContent>

          <TabsContent value="configuracao">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <Network className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Configuração do Organograma</h3>
                <p className="text-slate-500">Ferramentas de configuração em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>

          <TabsContent value="relatorios">
            <GlassmorphicCard className="p-6">
              <div className="text-center py-12">
                <Network className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Relatórios Organizacionais</h3>
                <p className="text-slate-500">Relatórios de estrutura em desenvolvimento.</p>
              </div>
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
