'use client';

import { useRooms } from '@/app/hooks/useRooms';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, BedDouble, Tag } from 'lucide-react';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function PanelSelectRoom({ onSelectRoom, selectedRoomId }) {
  const { isPending, data: rooms, isError, error } = useRooms();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isPending) {
    return <div className="py-4 text-center">Cargando habitaciones...</div>;
  }

  if (isError) {
    return (
      <div className="py-4 text-center text-red-500">
        Error al cargar habitaciones: {error.message}
      </div>
    );
  }

  const categories = [...new Set(rooms?.map((room) => room.category?.id))]
    .map((id) => rooms.find((room) => room.category?.id === id)?.category)
    .filter(Boolean);

  const filteredRooms = selectedCategory
    ? rooms.filter((room) => room.category?.id === selectedCategory)
    : rooms;

  return (
    <div className="space-y-4">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 max-h-[400px] overflow-y-auto p-1">
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className={`overflow-hidden transition-all hover:shadow-lg ${
              selectedRoomId === room.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            {room.images && room.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {room.images.map((image, index) => (
                    <CarouselItem key={image.id}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={image.imageUrl || '/placeholder.svg'}
                          alt={`${room.name} - Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="relative h-48 w-full">
                <Image
                  src="/images/HabitacionImage2.jpg"
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </div>
                <Badge variant="outline">{room.category?.name}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${Number(room.cost).toFixed(2)}/noche</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Capacidad: {room.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span>Habitación</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>{room.category?.name}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => onSelectRoom(parseInt(room.id))}
                className="w-full"
                variant={selectedRoomId === room.id ? 'default' : 'outline'}
              >
                {selectedRoomId === room.id
                  ? '✓ Seleccionada'
                  : 'Seleccionar habitación'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
