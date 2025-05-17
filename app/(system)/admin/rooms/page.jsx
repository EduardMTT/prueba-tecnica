'use client';

import { Button } from '@/components/ui/button';
import PanelCategories from '../components/panel-categories';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function RoomsPanel() {
  const [showRooms, setShowRooms] = useState(false);
  const [category, setCategory] = useState(null);

  const handleViewRooms = (selectedCategory = null) => {
    setCategory(selectedCategory);
    setShowRooms(true);
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div
        className={`w-full transition-transform duration-500 ease-in-out ${
          showRooms ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <PanelCategories handleViewRooms={handleViewRooms} />
      </div>

      <div
        className={`w-full absolute top-0 left-0 transition-transform duration-500 ease-in-out ${
          showRooms ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <Button
            onClick={() => setShowRooms(false)}
            className="mb-4"
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Regresar a categorías
          </Button>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              {category ? `Habitaciones: ${category.name}` : 'Habitaciones'}
            </h2>
            <p className="text-gray-500">
              {category
                ? `${category.description}`
                : 'Seleccione una categoría para ver sus habitaciones'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
