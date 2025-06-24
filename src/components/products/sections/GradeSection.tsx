
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ProductFormData } from '../types/ProductFormData';
import { Grid3x3, Plus, Trash2, Palette, Ruler } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GradeSectionProps {
  form: UseFormReturn<ProductFormData>;
}

interface Grade {
  id: string;
  tamanho: string;
  cor: string;
  codigo_grade: string;
}

export default function GradeSection({ form }: GradeSectionProps) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [novoTamanho, setNovoTamanho] = useState('');
  const [novaCor, setNovaCor] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const controleGrade = form.watch('controla_grade');

  const tamanhosPredefinidos = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '38', '40', '42', '44', '46', '48'];
  const coresPredefinidas = [
    { nome: 'Branco', hex: '#FFFFFF' },
    { nome: 'Preto', hex: '#000000' },
    { nome: 'Azul', hex: '#0066CC' },
    { nome: 'Vermelho', hex: '#CC0000' },
    { nome: 'Verde', hex: '#00CC00' },
    { nome: 'Amarelo', hex: '#FFCC00' },
    { nome: 'Rosa', hex: '#FF6699' },
    { nome: 'Cinza', hex: '#666666' },
  ];

  const adicionarGrade = () => {
    if (!novoTamanho || !novaCor) return;

    const novaGrade: Grade = {
      id: Date.now().toString(),
      tamanho: novoTamanho,
      cor: novaCor,
      codigo_grade: `${novoTamanho}-${novaCor}`,
    };

    setGrades(prev => [...prev, novaGrade]);
    setNovoTamanho('');
    setNovaCor('');
    setDialogOpen(false);
  };

  const removerGrade = (id: string) => {
    setGrades(prev => prev.filter(grade => grade.id !== id));
  };

  const gerarTodasCombinacoes = () => {
    const tamanhosSelecionados = ['P', 'M', 'G']; // Exemplo
    const coresSelecionadas = ['Branco', 'Preto', 'Azul']; // Exemplo
    
    const novasGrades: Grade[] = [];
    
    tamanhosSelecionados.forEach(tamanho => {
      coresSelecionadas.forEach(cor => {
        novasGrades.push({
          id: `${tamanho}-${cor}-${Date.now()}`,
          tamanho,
          cor,
          codigo_grade: `${tamanho}-${cor}`,
        });
      });
    });
    
    setGrades(novasGrades);
  };

  if (!controleGrade) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Grid3x3 className="h-4 w-4" />
              Grades e Variações
            </CardTitle>
            <CardDescription>
              Este produto não possui controle por grade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Grid3x3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">Controle por grade desabilitado</p>
              <p className="text-sm text-gray-400">
                Ative o "Controle por Grade" na seção Estoque para gerenciar variações de tamanho e cor.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gerenciamento de Grades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Grid3x3 className="h-4 w-4" />
            Grades e Variações
          </CardTitle>
          <CardDescription>
            Configure as variações de tamanho e cor do produto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Combinações de Grade</p>
              <p className="text-xs text-muted-foreground">
                {grades.length} variação(ões) cadastrada(s)
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={gerarTodasCombinacoes}
              >
                Gerar Padrão
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Grade
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Variação de Grade</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova combinação de tamanho e cor
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tamanho</label>
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        {tamanhosPredefinidos.map(tamanho => (
                          <Button
                            key={tamanho}
                            type="button"
                            variant={novoTamanho === tamanho ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNovoTamanho(tamanho)}
                          >
                            {tamanho}
                          </Button>
                        ))}
                      </div>
                      <Input
                        placeholder="Ou digite um tamanho personalizado"
                        value={novoTamanho}
                        onChange={(e) => setNovoTamanho(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Cor</label>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {coresPredefinidas.map(cor => (
                          <Button
                            key={cor.nome}
                            type="button"
                            variant={novaCor === cor.nome ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNovaCor(cor.nome)}
                            className="justify-start"
                          >
                            <div 
                              className="w-3 h-3 rounded-full mr-2 border"
                              style={{ backgroundColor: cor.hex }}
                            />
                            {cor.nome}
                          </Button>
                        ))}
                      </div>
                      <Input
                        placeholder="Ou digite uma cor personalizada"
                        value={novaCor}
                        onChange={(e) => setNovaCor(e.target.value)}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      onClick={adicionarGrade}
                      disabled={!novoTamanho || !novaCor}
                      className="w-full"
                    >
                      Adicionar Variação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {grades.length > 0 ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-mono text-sm">
                        {grade.codigo_grade}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {grade.tamanho}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-200" />
                          {grade.cor}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Ativo</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerGrade(grade.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Grid3x3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">Nenhuma grade cadastrada</p>
              <p className="text-sm text-gray-400">
                Clique em "Adicionar Grade" para criar variações do produto.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
