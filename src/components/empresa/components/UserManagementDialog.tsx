
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { UserRoleForm } from '@/components/empresa/forms/UserRoleForm';

interface UserManagementDialogProps {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function UserManagementDialog({ user, isOpen, onOpenChange, onSuccess }: UserManagementDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Roles - {user.full_name}</DialogTitle>
        </DialogHeader>
        <UserRoleForm user={user} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
