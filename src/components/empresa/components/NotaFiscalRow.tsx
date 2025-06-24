
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, FileText, Calendar, Hash } from 'lucide-react';
import { NotaFiscalCompra, NotaFiscalVenda, ItemNotaFiscal } from '../hooks/useEmpresaHistory';
import { cn } from '@/lib/utils';

interface NotaFiscalRowProps {
  notaFiscal: NotaFiscalCompra | NotaFiscalVenda;
  isExpanded: boolean;
  onToggleExpand: () => void;
  tipo: 'compra' | 'venda';
}

export function NotaFiscalRow({ notaFiscal, isExpanded, onToggleExpand, tipo }: NotaFiscalRowProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      autorizada: 'default',
      emitida: 'secondary',
      cancelada: 'destructive',
      rejeitada: 'destructive'
    } as const;

    const labels = {
      autorizada: 'Autorizada',
      emitida: 'Emitida',
      cancelada: 'Cancelada',
      rejeitada: 'Rejeitada'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getEmpresaName = () => {
    if (tipo === 'compra') {
      return (notaFiscal as NotaFiscalCompra).fornecedor;
    }
    return (notaFiscal as NotaFiscalVenda).cliente;
  };

  return (
    <>
      {/* Linha Principal da NF */}
      <tr 
        className={cn(
          "bg-slate-50/50 border-l-4 border-l-blue-200 hover:bg-slate-50 transition-colors cursor-pointer",
          isExpanded && "bg-slate-100/50"
        )}
        onClick={onToggleExpand}
      >
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{notaFiscal.numero}</div>
                <div className="text-xs text-muted-foreground">Série {notaFiscal.serie}</div>
              </div>
            </div>
          </div>
        </td>
        
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">
              {new Date(notaFiscal.data_emissao).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </td>
        
        <td className="p-4">
          <div className="text-sm font-medium">{getEmpresaName()}</div>
        </td>
        
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Hash className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-mono">{notaFiscal.cfop}</span>
          </div>
        </td>
        
        <td className="p-4 text-right">
          <div className="text-sm font-medium">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(notaFiscal.valor_total)}
          </div>
          <div className="text-xs text-muted-foreground">
            {notaFiscal.itens.length} {notaFiscal.itens.length === 1 ? 'item' : 'itens'}
          </div>
        </td>
        
        <td className="p-4">
          {getStatusBadge(notaFiscal.status)}
        </td>
      </tr>

      {/* Linhas dos Itens (quando expandido) */}
      {isExpanded && notaFiscal.itens.map((item, index) => (
        <tr 
          key={item.id}
          className={cn(
            "bg-slate-25 border-l-4 border-l-slate-200",
            index === notaFiscal.itens.length - 1 && "border-b border-slate-200"
          )}
        >
          <td className="p-4 pl-12">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-600">{item.produto_codigo}</div>
                <div className="text-xs text-muted-foreground">NCM: {item.ncm}</div>
              </div>
            </div>
          </td>
          
          <td className="p-4">
            <div className="text-sm font-medium text-slate-700">{item.produto_nome}</div>
          </td>
          
          <td className="p-4">
            <div className="text-sm text-slate-600">
              {item.quantidade} {item.unidade}
            </div>
          </td>
          
          <td className="p-4">
            <div className="text-sm text-slate-600">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(item.valor_unitario)}
            </div>
          </td>
          
          <td className="p-4 text-right">
            <div className="text-sm font-medium text-slate-700">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(item.valor_total)}
            </div>
          </td>
          
          <td className="p-4">
            <Badge variant="outline" className="text-xs">
              CFOP {item.cfop}
            </Badge>
          </td>
        </tr>
      ))}
    </>
  );
}
