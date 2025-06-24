
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ShoppingCart, ShoppingBag, Package, FileText } from 'lucide-react';

interface EmpresaTabsNavigationProps {
  empresa: any;
}

export function EmpresaTabsNavigation({ empresa }: EmpresaTabsNavigationProps) {
  const showCompras = empresa.tipo_empresa === 'fornecedor' || empresa.tipo_empresa === 'ambos';
  const showVendas = empresa.tipo_empresa === 'cliente' || empresa.tipo_empresa === 'ambos';
  const tabsCount = 3 + (showCompras ? 1 : 0) + (showVendas ? 1 : 0);

  return (
    <TabsList className={`flex-shrink-0 grid w-full grid-cols-${tabsCount} mb-4 bg-white/50 backdrop-blur-sm border border-slate-200/50`}>
      <TabsTrigger value="dados-gerais" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
        <User className="h-4 w-4" />
        Dados Gerais
      </TabsTrigger>
      {showCompras && (
        <TabsTrigger value="compras" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
          <ShoppingCart className="h-4 w-4" />
          Compras
        </TabsTrigger>
      )}
      {showVendas && (
        <TabsTrigger value="vendas" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
          <ShoppingBag className="h-4 w-4" />
          Vendas
        </TabsTrigger>
      )}
      <TabsTrigger value="pedidos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
        <FileText className="h-4 w-4" />
        Pedidos
      </TabsTrigger>
      <TabsTrigger value="produtos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800">
        <Package className="h-4 w-4" />
        Produtos
      </TabsTrigger>
    </TabsList>
  );
}
