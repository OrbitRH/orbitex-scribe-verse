
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FilterState {
  tipo_produto: string;
  categoria_id: string;
  situacao: string;
}

export default function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    tipo_produto: '',
    categoria_id: '',
    situacao: '',
  });
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase
      .from('categorias_produtos')
      .select('*')
      .eq('ativo', true)
      .order('nome');
    
    if (!error && data) {
      setCategorias(data);
    }
  };

  const tiposProduto = [
    { value: 'materia_prima', label: 'Matéria-Prima' },
    { value: 'produto_acabado', label: 'Produto Acabado' },
    { value: 'em_processo', label: 'Em Processo' },
    { value: 'aviamento', label: 'Aviamento' },
    { value: 'servico', label: 'Serviço' },
  ];

  const situacaoOptions = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' },
  ];

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
  };

  const clearAllFilters = () => {
    setFilters({
      tipo_produto: '',
      categoria_id: '',
      situacao: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <Select value={filters.tipo_produto} onValueChange={(value) => updateFilter('tipo_produto', value)}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Tipo de produto" />
          </SelectTrigger>
          <SelectContent>
            {tiposProduto.map((tipo) => (
              <SelectItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.categoria_id} onValueChange={(value) => updateFilter('categoria_id', value)}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((categoria) => (
              <SelectItem key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.situacao} onValueChange={(value) => updateFilter('situacao', value)}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Situação" />
          </SelectTrigger>
          <SelectContent>
            {situacaoOptions.map((situacao) => (
              <SelectItem key={situacao.value} value={situacao.value}>
                {situacao.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {filters.tipo_produto && (
              <Badge variant="secondary" className="text-xs">
                {tiposProduto.find(t => t.value === filters.tipo_produto)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => clearFilter('tipo_produto')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.categoria_id && (
              <Badge variant="secondary" className="text-xs">
                {categorias.find(c => c.id === filters.categoria_id)?.nome}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => clearFilter('categoria_id')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.situacao && (
              <Badge variant="secondary" className="text-xs">
                {situacaoOptions.find(s => s.value === filters.situacao)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => clearFilter('situacao')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
}
