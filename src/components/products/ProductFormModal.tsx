
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';
import ProductForm from './ProductForm';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSuccess: () => void;
}

export default function ProductFormModal({ 
  isOpen, 
  onClose, 
  product, 
  onSuccess 
}: ProductFormModalProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  const content = (
    <div className="max-h-[90vh] overflow-y-auto">
      <ProductForm 
        product={product}
        onSuccess={handleSuccess}
      />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[95vh]">
          <DrawerHeader className="flex items-center justify-between border-b">
            <DrawerTitle>
              {product ? 'Editar Produto' : 'Novo Produto'}
            </DrawerTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DrawerHeader>
          <div className="p-4">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
