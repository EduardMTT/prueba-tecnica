'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRooms } from '@/app/hooks/useRooms';

export function RoomCards() {
  const { isPending, data: rooms, isError, error } = useRooms();

  const [hoveredCardId, setHoveredCardId] = useState(null);
  if (isPending) {
    return <>Cargando...</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-6 mb-6">
        {rooms &&
          rooms.slice(0, 8).map((room) => (
            <Card
              className="mx-auto w-full max-w-sm 'overflow-hidden border-[#c7d2d9] transition-all duration-300 hover:shadow-lg"
              key={room.id}
              onMouseEnter={() => setHoveredCardId(room.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="relative">
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={'/images/HabitacionImage2.jpg'}
                    alt={'imagen'}
                    width={600}
                    height={400}
                    className={`w-full object-cover transition-transform duration-700 ${
                      hoveredCardId === room.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <div className="absolute top-0 left-0">
                  <Badge className="bg-gradient-to-l from-green-500 to-blue-900 text-xs sm:text-sm md:text-base lg:text-xl">
                    {room.category.name}
                  </Badge>
                </div>
                <div className="absolute bottom-0 right-0 bg-[#025575] px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-white font-bold text-sm sm:text-base">
                  ${room.cost}{' '}
                  <span className="text-xs sm:text-sm font-normal">/noche</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">
                  {room.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {room.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#0466df]" />
                  <span>Capacidad: {room.capacity} Huéspedes</span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}
