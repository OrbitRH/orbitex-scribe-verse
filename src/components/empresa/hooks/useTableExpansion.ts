
import { useState } from 'react';

export function useTableExpansion() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpansion = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string) => expandedRows.has(id);

  const expandAll = (ids: string[]) => {
    setExpandedRows(new Set(ids));
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
  };

  return {
    isExpanded,
    toggleExpansion,
    expandAll,
    collapseAll
  };
}
