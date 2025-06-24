
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  icon?: React.ReactNode;
}

export function ModernCard({ 
  title, 
  children, 
  className, 
  headerClassName,
  contentClassName,
  icon 
}: ModernCardProps) {
  return (
    <Card className={cn(
      "bg-slate-50/30 backdrop-blur-sm border-slate-200/50 shadow-lg shadow-slate-200/20",
      "hover:bg-slate-50/40 transition-all duration-300",
      className
    )}>
      {title && (
        <CardHeader className={cn("pb-3", headerClassName)}>
          <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("space-y-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
