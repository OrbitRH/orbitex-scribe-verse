
import React, { useState } from 'react';
import { ConvenioFormModal } from './ConvenioFormModal';
import { ConveniosHeader } from './components/ConveniosHeader';
import { ConveniosList } from './components/ConveniosList';
import { useConvenios } from './hooks/useConvenios';
import { Convenio } from './types/ConvenioTypes';

export function ConveniosGestao() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConvenio, setEditingConvenio] = useState<Convenio | null>(null);
  
  const { convenios, loading, fetchConvenios, handleDelete } = useConvenios();

  const handleEdit = (convenio: Convenio) => {
    setEditingConvenio(convenio);
    setIsModalOpen(true);
  };

  const filteredConvenios = convenios.filter(convenio =>
    convenio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convenio.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (convenio.codigo && convenio.codigo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (convenio.empresa_convenio && convenio.empresa_convenio.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <ConveniosHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNewConvenio={() => {
          setEditingConvenio(null);
          setIsModalOpen(true);
        }}
      />

      <ConveniosList
        convenios={filteredConvenios}
        loading={loading}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConvenioFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingConvenio(null);
        }}
        convenio={editingConvenio}
        onSuccess={() => {
          fetchConvenios();
          setIsModalOpen(false);
          setEditingConvenio(null);
        }}
      />
    </div>
  );
}
