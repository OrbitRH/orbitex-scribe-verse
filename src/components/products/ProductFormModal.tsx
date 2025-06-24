
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
import { X, Package } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductForm from './ProductForm';
import { GlassmorphicCard } from './components/GlassmorphicCard';

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
  const isMobile = useIsMobile();

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
        <DrawerContent className="h-[95vh] bg-gradient-to-br from-slate-50/95 to-blue-50/50">
          <DrawerHeader className="flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100/80">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <DrawerTitle className="text-lg font-semibold text-slate-800">
                {product ? 'Editar Produto' : 'Novo Produto'}
              </DrawerTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DrawerHeader>
          <div className="p-4 bg-gradient-to-br from-slate-50/80 to-blue-50/40">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-hidden p-0 bg-gradient-to-br from-slate-50/95 to-blue-50/50 border-slate-200/60">
        <DialogHeader className="border-b border-slate-200/60 p-6 bg-white/70 backdrop-blur-sm">
          <DialogTitle className="flex items-center gap-3 text-xl text-slate-800">
            <div className="p-2 rounded-lg bg-blue-100/80">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 p-6 bg-gradient-to-br from-slate-50/80 to-blue-50/40">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
