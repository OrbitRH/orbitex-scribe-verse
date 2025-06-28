
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type CategoriaType = 'saude' | 'alimentacao' | 'transporte' | 'educacao' | 'outros';
type TipoDescontoType = 'valor_fixo' | 'percentual' | 'sem_desconto';

interface TipoBeneficio {
  id: string;
  nome: string;
  codigo?: string;
  categoria: CategoriaType;
  descricao?: string;
  valor_empresa?: number;
  valor_desconto?: number;
  tipo_desconto?: TipoDescontoType;
  periodicidade?: string;
  permite_dependentes?: boolean;
  obrigatorio?: boolean;
  ativo: boolean;
}

interface BeneficioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficio?: TipoBeneficio | null;
  onSuccess: () => void;
}

interface FormData {
  nome: string;
  codigo: string;
  categoria: CategoriaType;
  descricao: string;
  valor_empresa: string;
  valor_desconto: string;
  tipo_desconto: TipoDescontoType;
  periodicidade: string;
  permite_dependentes: boolean;
  obrigatorio: boolean;
  ativo: boolean;
}

export function BeneficioFormModal({ isOpen, onClose, beneficio, onSuccess }: BeneficioFormModalProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      nome: beneficio?.nome || '',
      codigo: beneficio?.codigo || '',
      categoria: beneficio?.categoria || 'saude',
      descricao: beneficio?.descricao || '',
      valor_empresa: beneficio?.valor_empresa?.toString() || '',
      valor_desconto: beneficio?.valor_desconto?.toString() || '',
      tipo_desconto: beneficio?.tipo_desconto || 'valor_fixo',
      periodicidade: beneficio?.periodicidade || 'mensal',
      permite_dependentes: beneficio?.permite_dependentes || false,
      obrigatorio: beneficio?.obrigatorio || false,
      ativo: beneficio?.ativo ?? true,
    }
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        nome: beneficio?.nome || '',
        codigo: beneficio?.codigo || '',
        categoria: beneficio?.categoria || 'saude',
        descricao: beneficio?.descricao || '',
        valor_empresa: beneficio?.valor_empresa?.toString() || '',
        valor_desconto: beneficio?.valor_desconto?.toString() || '',
        tipo_desconto: beneficio?.tipo_desconto || 'valor_fixo',
        periodicidade: beneficio?.periodicidade || 'mensal',
        permite_dependentes: beneficio?.permite_dependentes || false,
        obrigatorio: beneficio?.obrigatorio || false,
        ativo: beneficio?.ativo ?? true,
      });
    }
  }, [isOpen, beneficio, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const beneficioData = {
        nome: data.nome,
        codigo: data.codigo || null,
        categoria: data.categoria,
        descricao: data.descricao || null,
        valor_empresa: data.valor_empresa ? parseFloat(data.valor_empresa) : null,
        valor_desconto: data.valor_desconto ? parseFloat(data.valor_desconto) : null,
        tipo_desconto: data.tipo_desconto,
        periodicidade: data.periodicidade,
        permite_dependentes: data.permite_dependentes,
        obrigatorio: data.obrigatorio,
        ativo: data.ativo,
      };

      if (beneficio) {
        const { error } = await supabase
          .from('tipos_beneficios')
          .update(beneficioData)
          .eq('id', beneficio.id);

        if (error) throw error;
        toast.success('Benefício atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('tipos_beneficios')
          .insert(beneficioData);

        if (error) throw error;
        toast.success('Benefício criado com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar benefício:', error);
      toast.error('Erro ao salvar benefício');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {beneficio ? 'Editar Benefício' : 'Novo Benefício'}
          </DialogTitle>
          <DialogDescription>
            {beneficio ? 'Edite as informações do benefício' : 'Cadastre um novo tipo de benefício'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                {...register('nome', { required: true })}
                placeholder="Nome do benefício"
              />
            </div>
            <div>
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                {...register('codigo')}
                placeholder="Código identificador"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={watch('categoria')} onValueChange={(value: CategoriaType) => setValue('categoria', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="periodicidade">Periodicidade</Label>
              <Select value={watch('periodicidade')} onValueChange={(value) => setValue('periodicidade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a periodicidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="quinzenal">Quinzenal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              {...register('descricao')}
              placeholder="Descrição do benefício"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="valor_empresa">Valor Empresa (R$)</Label>
              <Input
                id="valor_empresa"
                type="number"
                step="0.01"
                {...register('valor_empresa')}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="valor_desconto">Valor Desconto</Label>
              <Input
                id="valor_desconto"
                type="number"
                step="0.01"
                {...register('valor_desconto')}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="tipo_desconto">Tipo de Desconto</Label>
              <Select value={watch('tipo_desconto')} onValueChange={(value: TipoDescontoType) => setValue('tipo_desconto', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valor_fixo">Valor Fixo</SelectItem>
                  <SelectItem value="percentual">Percentual</SelectItem>
                  <SelectItem value="sem_desconto">Sem Desconto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="permite_dependentes"
                checked={watch('permite_dependentes')}
                onCheckedChange={(checked) => setValue('permite_dependentes', checked)}
              />
              <Label htmlFor="permite_dependentes">Permite Dependentes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="obrigatorio"
                checked={watch('obrigatorio')}
                onCheckedChange={(checked) => setValue('obrigatorio', checked)}
              />
              <Label htmlFor="obrigatorio">Obrigatório</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="ativo"
                checked={watch('ativo')}
                onCheckedChange={(checked) => setValue('ativo', checked)}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : beneficio ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
