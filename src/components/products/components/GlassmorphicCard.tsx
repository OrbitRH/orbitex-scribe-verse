
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
}

export function GlassmorphicCard({ 
  children, 
  className, 
  variant = 'default' 
}: GlassmorphicCardProps) {
  const variants = {
    default: 'bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/25',
    elevated: 'bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-2xl shadow-slate-200/30',
    subtle: 'bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/20'
  };

  return (
    <div className={cn(
      'rounded-xl transition-all duration-300',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}
