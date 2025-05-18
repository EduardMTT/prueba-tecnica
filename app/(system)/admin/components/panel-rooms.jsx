'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Users } from 'lucide-react';
import { useRooms } from '@/app/hooks/useRooms';
import { DialogDeleteRoom } from './dialog-delete-room';
import DialogEditRoom from './dialog-edit-room';
import { Pencil } from 'lucide-react';

export function PanelRooms({ categoryId }) {
  const {
    isPending,
    data: rooms,
    isError,
    error,
  } = useRooms({ categoryId: categoryId });

  const [currentRoom, setCurrentRoom] = useState(null);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (room = null) => {
    setCurrentRoom(room);
    setIsOpenDialogEdit(true);
  };

  const handleClose = (open) => {
    setIsOpenDialogEdit(open);
    setCurrentRoom(null);
  };
  const [deleteButtonHovered, setDeleteButtonHovered] = useState(null);

  if (isPending) {
    return <>Cargando...</>;
  }
  return (
    <>
      {rooms &&
        rooms.map((room) => (
          <Card
            key={room.id}
            className={`overflow-hidden border-[#c7d2d9] transition-all duration-300 hover:shadow-lg ${
              deleteButtonHovered === room.id
                ? 'shadow-lg bg-red-100'
                : 'overflow-hidden border-[#c7d2d9] transition-all duration-300 hover:shadow-lg'
            } h-full`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={'/placeholder.svg?height=400&width=600'}
                  alt={'imagen'}
                  width={600}
                  height={400}
                  className={`w-full object-cover transition-transform duration-700 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>

              <div className="absolute bottom-0 right-0 bg-[#025575] px-4 py-2 text-white font-bold">
                ${room.cost} <span className="text-sm font-normal">/noche</span>
              </div>
              <Badge className="absolute top-4 left-4 bg-[#5debf2] hover:bg-[#5debf2] text-[#025575]">
                {room.category.name}
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-[#025575]">
                  {room.name}
                </h3>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1 text-[#0466df]" />
                  <span>Capacidad: {room.capacity} Huéspedes</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between p-6 pt-0">
              <Button
                variant="outline"
                className="border-[#0466df] text-[#0466df] hover:bg-[#0466df] hover:text-white"
              >
                <Link href={'#'} className="flex items-center">
                  Ver Imagenes
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(room)}
              >
                <Pencil className=" h-4 w-4" />
              </Button>
              <DialogEditRoom
                currentRoom={currentRoom}
                isOpenDialogEdit={isOpenDialogEdit}
                handleClose={handleClose}
              />
              <DialogDeleteRoom
                id={room.id}
                setDeleteButtonHovered={setDeleteButtonHovered}
              />
            </CardFooter>
          </Card>
        ))}
    </>
  );
}
