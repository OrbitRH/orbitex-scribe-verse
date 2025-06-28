
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

interface Convenio {
  id: string;
  nome: string;
  codigo?: string;
  tipo: string;
  empresa_convenio?: string;
  descricao?: string;
  ans_registro?: string;
  permite_dependentes?: boolean;
  contato?: string;
  telefone?: string;
  email?: string;
  site?: string;
  ativo: boolean;
}

interface ConvenioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  convenio?: Convenio | null;
  onSuccess: () => void;
}

interface FormData {
  nome: string;
  codigo: string;
  tipo: string;
  empresa_convenio: string;
  descricao: string;
  ans_registro: string;
  permite_dependentes: boolean;
  contato: string;
  telefone: string;
  email: string;
  site: string;
  ativo: boolean;
}

export function ConvenioFormModal({ isOpen, onClose, convenio, onSuccess }: ConvenioFormModalProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      nome: convenio?.nome || '',
      codigo: convenio?.codigo || '',
      tipo: convenio?.tipo || '',
      empresa_convenio: convenio?.empresa_convenio || '',
      descricao: convenio?.descricao || '',
      ans_registro: convenio?.ans_registro || '',
      permite_dependentes: convenio?.permite_dependentes || false,
      contato: convenio?.contato || '',
      telefone: convenio?.telefone || '',
      email: convenio?.email || '',
      site: convenio?.site || '',
      ativo: convenio?.ativo ?? true,
    }
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        nome: convenio?.nome || '',
        codigo: convenio?.codigo || '',
        tipo: convenio?.tipo || '',
        empresa_convenio: convenio?.empresa_convenio || '',
        descricao: convenio?.descricao || '',
        ans_registro: convenio?.ans_registro || '',
        permite_dependentes: convenio?.permite_dependentes || false,
        contato: convenio?.contato || '',
        telefone: convenio?.telefone || '',
        email: convenio?.email || '',
        site: convenio?.site || '',
        ativo: convenio?.ativo ?? true,
      });
    }
  }, [isOpen, convenio, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const convenioData = {
        nome: data.nome,
        codigo: data.codigo || null,
        tipo: data.tipo,
        empresa_convenio: data.empresa_convenio || null,
        descricao: data.descricao || null,
        ans_registro: data.ans_registro || null,
        permite_dependentes: data.permite_dependentes,
        contato: data.contato || null,
        telefone: data.telefone || null,
        email: data.email || null,
        site: data.site || null,
        ativo: data.ativo,
      };

      if (convenio) {
        const { error } = await supabase
          .from('convenios')
          .update(convenioData)
          .eq('id', convenio.id);

        if (error) throw error;
        toast.success('Convênio atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('convenios')
          .insert([convenioData]);

        if (error) throw error;
        toast.success('Convênio criado com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar convênio:', error);
      toast.error('Erro ao salvar convênio');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {convenio ? 'Editar Convênio' : 'Novo Convênio'}
          </DialogTitle>
          <DialogDescription>
            {convenio ? 'Edite as informações do convênio' : 'Cadastre um novo convênio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome do Convênio *</Label>
              <Input
                id="nome"
                {...register('nome', { required: true })}
                placeholder="Nome do convênio"
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
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={watch('tipo')} onValueChange={(value) => setValue('tipo', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medico">Médico</SelectItem>
                  <SelectItem value="odontologico">Odontológico</SelectItem>
                  <SelectItem value="farmacia">Farmácia</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ans_registro">Registro ANS</Label>
              <Input
                id="ans_registro"
                {...register('ans_registro')}
                placeholder="Número do registro ANS"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="empresa_convenio">Empresa Conveniada</Label>
            <Input
              id="empresa_convenio"
              {...register('empresa_convenio')}
              placeholder="Nome da empresa conveniada"
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              {...register('descricao')}
              placeholder="Descrição do convênio"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contato">Contato Responsável</Label>
              <Input
                id="contato"
                {...register('contato')}
                placeholder="Nome do responsável"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                {...register('telefone')}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="contato@convenio.com"
              />
            </div>
            <div>
              <Label htmlFor="site">Site</Label>
              <Input
                id="site"
                {...register('site')}
                placeholder="www.convenio.com"
              />
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
              {isSubmitting ? 'Salvando...' : convenio ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
