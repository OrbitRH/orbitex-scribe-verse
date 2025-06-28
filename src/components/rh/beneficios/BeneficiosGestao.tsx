
import React, { useState } from 'react';
import { BeneficiosHeader } from './components/BeneficiosHeader';
import { BeneficiosList } from './components/BeneficiosList';
import { BeneficioFormModal } from './BeneficioFormModal';
import { useBeneficios } from './hooks/useBeneficios';
import { TipoBeneficio } from './types/BeneficioTypes';

export function BeneficiosGestao() {
  const { beneficios, loading, fetchBeneficios, deleteBeneficio } = useBeneficios();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeneficio, setEditingBeneficio] = useState<TipoBeneficio | null>(null);

  const handleEdit = (beneficio: TipoBeneficio) => {
    setEditingBeneficio(beneficio);
    setIsModalOpen(true);
  };

  const handleNewBeneficio = () => {
    setEditingBeneficio(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBeneficio(null);
  };

  const handleModalSuccess = () => {
    fetchBeneficios();
    setIsModalOpen(false);
    setEditingBeneficio(null);
  };

  const filteredBeneficios = beneficios.filter(beneficio =>
    beneficio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficio.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (beneficio.codigo && beneficio.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <BeneficiosHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNewBeneficio={handleNewBeneficio}
      />

      <BeneficiosList
        beneficios={filteredBeneficios}
        loading={loading}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={deleteBeneficio}
      />

      <BeneficioFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        beneficio={editingBeneficio}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
