import { RoomCards } from './room-cards';
import { Star } from 'lucide-react';
export function RoomsSection() {
  return (
    <div className="">
      <div className="text-center font-bold text-3xl">
        <span className="text-xs md:text-sm uppercase tracking-wider text-blue-950 font-medium">
          Confort y Elegancia
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-2">
          Habitaciones para cualquier ocasion
        </h2>
        <div className="flex items-center justify-center m-4">
          {[...Array(5)].map((_, index) => (
            <Star className="text-amber-400 fill-amber-400" key={index} />
          ))}
        </div>

        <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-cyan-300 to-green-500 mx-auto mt-4 rounded-full" />
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-sm md:text-base">
          Descubre nuestras lujosas habitaciones diseñadas para brindarte la
          máxima comodidad y una experiencia inolvidable durante tu estancia.
        </p>
      </div>

      <RoomCards />
    </div>
  );
}
