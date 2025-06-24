
import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export function ModernInput({
  label,
  description,
  error,
  required,
  className,
  ...props
}: ModernInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Input
        className={cn(
          'h-11 bg-white/80 border-slate-200/60 focus:border-blue-400/60 focus:ring-blue-400/20',
          'transition-all duration-200 backdrop-blur-sm',
          error && 'border-red-300 focus:border-red-400 focus:ring-red-400/20',
          className
        )}
        {...props}
      />
      {description && (
        <p className="text-xs text-slate-600">{description}</p>
      )}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
