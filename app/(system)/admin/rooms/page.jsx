'use client';

import { Button } from '@/components/ui/button';
import PanelCategories from '../components/panel-categories';
import { PanelRooms } from '../components/panel-rooms';
import DialogCreateRoom from '../components/dialog-create-room';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function RoomsPanel() {
  const [showRooms, setShowRooms] = useState(false);
  const [category, setCategory] = useState(null);

  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);

  const handleViewRooms = (selectedCategory = null) => {
    setCategory(selectedCategory);
    setShowRooms(true);
  };
  const handleDialogChange = (open) => {
    setIsOpenDialogAdd(open);
  };

  return (
    <div className="w-full relative">
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          showRooms
            ? '-translate-x-full opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
        style={{
          height: showRooms ? '0' : 'auto',
          overflow: showRooms ? 'hidden' : 'visible',
          visibility: showRooms ? 'hidden' : 'visible',
          transitionProperty: 'transform, opacity, visibility',
          transitionDelay: showRooms ? '0s, 0s, 0.5s' : '0s',
        }}
      >
        <PanelCategories handleViewRooms={handleViewRooms} />
      </div>

      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          showRooms ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          position: showRooms ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          height: showRooms ? 'auto' : '0',
          overflow: showRooms ? 'visible' : 'hidden',
          visibility: !showRooms ? 'hidden' : 'visible',
          transitionProperty: 'transform, opacity, visibility',
          transitionDelay: !showRooms ? '0s, 0s, 0.5s' : '0s',
        }}
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
            <p className="text-gray-500 mb-6">
              {category
                ? `${category.description}`
                : 'Seleccione una categoría para ver sus habitaciones'}
            </p>

            <div className="w-auto pb-3">
              {category && (
                <DialogCreateRoom
                  isOpenDialogAdd={isOpenDialogAdd}
                  handleClose={handleDialogChange}
                  categoryId={category.id}
                />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <PanelRooms categoryId={category?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
