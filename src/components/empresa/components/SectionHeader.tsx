
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  isCollapsible?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  isCollapsible = false,
  isExpanded = true,
  onToggle,
  actions,
  icon
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {isCollapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 h-auto text-slate-600 hover:text-slate-800"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="text-base font-medium text-slate-800">{title}</h3>
            {subtitle && (
              <p className="text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
