
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PermissoesSistemaProps {
  permissoesPorModulo: Record<string, any[]>;
}

export function PermissoesSistema({ permissoesPorModulo }: PermissoesSistemaProps) {
  return (
    <div className="space-y-6">
      {Object.entries(permissoesPorModulo).map(([modulo, perms]) => (
        <div key={modulo}>
          <h4 className="text-lg font-semibold mb-3 capitalize">
            Módulo: {modulo}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {perms.map((permissao) => (
              <Card key={permissao.id} className="p-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm">{permissao.nome}</h5>
                    <Badge variant="outline" className="text-xs">
                      {permissao.acao}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {permissao.descricao}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
