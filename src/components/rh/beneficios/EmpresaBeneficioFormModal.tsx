
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmpresaBeneficio {
  id: string;
  nome: string;
  cnpj?: string;
  razao_social?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  contato_responsavel?: string;
  observacoes?: string;
  ativo: boolean;
}

interface EmpresaBeneficioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: EmpresaBeneficio | null;
  onSuccess: () => void;
}

interface FormData {
  nome: string;
  cnpj: string;
  razao_social: string;
  telefone: string;
  email: string;
  endereco: string;
  contato_responsavel: string;
  observacoes: string;
  ativo: boolean;
}

export function EmpresaBeneficioFormModal({ isOpen, onClose, empresa, onSuccess }: EmpresaBeneficioFormModalProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      nome: empresa?.nome || '',
      cnpj: empresa?.cnpj || '',
      razao_social: empresa?.razao_social || '',
      telefone: empresa?.telefone || '',
      email: empresa?.email || '',
      endereco: empresa?.endereco || '',
      contato_responsavel: empresa?.contato_responsavel || '',
      observacoes: empresa?.observacoes || '',
      ativo: empresa?.ativo ?? true,
    }
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        nome: empresa?.nome || '',
        cnpj: empresa?.cnpj || '',
        razao_social: empresa?.razao_social || '',
        telefone: empresa?.telefone || '',
        email: empresa?.email || '',
        endereco: empresa?.endereco || '',
        contato_responsavel: empresa?.contato_responsavel || '',
        observacoes: empresa?.observacoes || '',
        ativo: empresa?.ativo ?? true,
      });
    }
  }, [isOpen, empresa, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const empresaData = {
        nome: data.nome,
        cnpj: data.cnpj || null,
        razao_social: data.razao_social || null,
        telefone: data.telefone || null,
        email: data.email || null,
        endereco: data.endereco || null,
        contato_responsavel: data.contato_responsavel || null,
        observacoes: data.observacoes || null,
        ativo: data.ativo,
      };

      if (empresa) {
        const { error } = await supabase
          .from('empresas_beneficios')
          .update(empresaData)
          .eq('id', empresa.id);

        if (error) throw error;
        toast.success('Empresa atualizada com sucesso');
      } else {
        const { error } = await supabase
          .from('empresas_beneficios')
          .insert([empresaData]);

        if (error) throw error;
        toast.success('Empresa criada com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      toast.error('Erro ao salvar empresa');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {empresa ? 'Editar Empresa' : 'Nova Empresa'}
          </DialogTitle>
          <DialogDescription>
            {empresa ? 'Edite as informações da empresa fornecedora' : 'Cadastre uma nova empresa fornecedora de benefícios'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome da Empresa *</Label>
              <Input
                id="nome"
                {...register('nome', { required: true })}
                placeholder="Nome fantasia"
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                {...register('cnpj')}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="razao_social">Razão Social</Label>
            <Input
              id="razao_social"
              {...register('razao_social')}
              placeholder="Razão social da empresa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                {...register('telefone')}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="contato@empresa.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Textarea
              id="endereco"
              {...register('endereco')}
              placeholder="Endereço completo da empresa"
            />
          </div>

          <div>
            <Label htmlFor="contato_responsavel">Contato Responsável</Label>
            <Input
              id="contato_responsavel"
              {...register('contato_responsavel')}
              placeholder="Nome do responsável comercial"
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              {...register('observacoes')}
              placeholder="Observações adicionais sobre a empresa"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={watch('ativo')}
              onCheckedChange={(checked) => setValue('ativo', checked)}
            />
            <Label htmlFor="ativo">Empresa Ativa</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : empresa ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
