
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserRolesBadgesProps {
  userRoles: any[];
  onRemoveRole: (userId: string, role: string) => void;
  userId: string;
}

export function UserRolesBadges({ userRoles, onRemoveRole, userId }: UserRolesBadgesProps) {
  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-800',
      gestor: 'bg-blue-100 text-blue-800',
      colaborador: 'bg-green-100 text-green-800',
      rh: 'bg-purple-100 text-purple-800',
      financeiro: 'bg-yellow-100 text-yellow-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (!userRoles || !Array.isArray(userRoles) || userRoles.length === 0) {
    return <Badge variant="outline">Sem roles</Badge>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {userRoles.map((userRole: any, index: number) => (
        <Badge
          key={index}
          className={getRoleColor(userRole.role)}
          variant="secondary"
        >
          {userRole.role}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1 hover:bg-red-200"
            onClick={() => onRemoveRole(userId, userRole.role)}
          >
            ×
          </Button>
        </Badge>
      ))}
    </div>
  );
}
