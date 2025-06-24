
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package, Info, Settings, FileText, DollarSign } from 'lucide-react';
import { useProductForm } from './hooks/useProductForm';
import BasicInfoTab from './tabs/BasicInfoTab';
import TechnicalTab from './tabs/TechnicalTab';
import StockTab from './tabs/StockTab';
import TechSheetTab from './tabs/TechSheetTab';
import CommercialTab from './tabs/CommercialTab';

interface ProductFormProps {
  onSuccess: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const { form, loading, categorias, unidades, onSubmit } = useProductForm(onSuccess);

  return (
    <div className="max-w-4xl mx-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Novo Produto
        </DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Tabs defaultValue="basico" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basico" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Básico
              </TabsTrigger>
              <TabsTrigger value="tecnico" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Técnico
              </TabsTrigger>
              <TabsTrigger value="estoque" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                Estoque
              </TabsTrigger>
              <TabsTrigger value="ficha" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Ficha
              </TabsTrigger>
              <TabsTrigger value="comercial" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Comercial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basico">
              <BasicInfoTab form={form} categorias={categorias} unidades={unidades} />
            </TabsContent>

            <TabsContent value="tecnico">
              <TechnicalTab form={form} />
            </TabsContent>

            <TabsContent value="estoque">
              <StockTab form={form} />
            </TabsContent>

            <TabsContent value="ficha">
              <TechSheetTab form={form} />
            </TabsContent>

            <TabsContent value="comercial">
              <CommercialTab form={form} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
