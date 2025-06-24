
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  progress: number;
  completedSections: number;
  totalSections: number;
  className?: string;
}

export function ProgressIndicator({
  progress,
  completedSections,
  totalSections,
  className
}: ProgressIndicatorProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Progresso do Cadastro
          </h3>
          <p className="text-sm text-slate-600">
            Complete as informações para finalizar o produto
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
          <div className="text-xs text-slate-500">
            {completedSections} de {totalSections} seções
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress 
          value={progress} 
          className="h-3 bg-slate-100/80"
        />
        
        {/* Status Indicators */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-600">
            <Circle className="h-3 w-3" />
            <span>Não iniciado</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="h-3 w-3" />
            <span>Concluído</span>
          </div>
        </div>
      </div>
    </div>
  );
}
