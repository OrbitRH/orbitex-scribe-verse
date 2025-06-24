
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'completed' | 'required' | 'optional';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: 'Concluído',
      variant: 'default' as const,
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    required: {
      icon: AlertCircle,
      label: 'Obrigatório',
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-700 border-red-200'
    },
    optional: {
      icon: Clock,
      label: 'Opcional',
      variant: 'outline' as const,
      className: 'bg-slate-100 text-slate-600 border-slate-200'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        'flex items-center gap-1 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
