'use client';

import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import ListServices from './services';

export function NavOptions() {
  return (
    <NavigationMenu className="z-40 ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Habitaciones</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="h-[6rem] w-auto bg-var(--soft-gray) rounded">
                    <Image
                      src="/images/HabitacionImage.jpg"
                      width={200}
                      height={200}
                      alt="HabitacionImage"
                      className="rounded"
                    />
                  </div>
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Tu descanso comienza aquí
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Desde suites lujosas hasta estancias acogedoras, tenemos la
                    habitación perfecta para ti.
                  </p>
                </a>
              </NavigationMenuLink>
              <div className="flex items-center">
                <ul className="list-disc pl-4 space-y-1 transition duration-300 transform hover:translate-x-2 hover:text-blue-600">
                  <li>Wi-Fi gratuito en todas las áreas</li>
                  <li>Servicio a la habitación 24/7</li>
                  <li>Desayuno incluido</li>
                  <li>Estacionamiento privado</li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="h-[6rem] w-auto bg-var(--soft-gray) rounded">
                    <Image
                      src="/images/Servicios.jpg"
                      width={200}
                      height={200}
                      alt="ServiciosImage"
                      className="rounded"
                    />
                  </div>
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Estamos a tu servicio
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Todas las actividades necesarias para una estadia completa.
                  </p>
                </a>
              </NavigationMenuLink>
              <div>
                <ListServices />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
