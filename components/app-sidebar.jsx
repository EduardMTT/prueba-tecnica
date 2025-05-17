'use client';

import { Hotel, Users, Text, Calendar, Home } from 'lucide-react';
import { NavUser } from './collapsed-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const adminItems = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Habitaciones',
    url: '/admin/rooms',
    icon: Hotel,
  },
  {
    title: 'Solicitudes',
    url: '/admin/reservaciones',
    icon: Users,
  },
  {
    title: 'Reservaciones',
    url: '/admin/reservaciones',
    icon: Calendar,
  },
  {
    title: 'Usuarios',
    url: '/admin/users',
    icon: Users,
  },
];

const clientItems = [
  {
    title: 'Home',
    url: '/client',
    icon: Hotel,
  },
  {
    title: 'Reservaciones',
    url: '/client/reservaciones',
    icon: Text,
  },
];

const skeletonWidths = ['70%', '65%', '80%', '75%', '85%', '60%'];

function CustomMenuSkeleton({ width }) {
  return (
    <div className="flex h-8 items-center gap-2 px-2 rounded-md">
      <Skeleton className="size-4 rounded-md" />
      <Skeleton className="h-4 flex-1" style={{ maxWidth: width }} />
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <Sidebar variant="floating" className="shadow-xs">
      <SidebarContent className="bg-[#025575]">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-24" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {skeletonWidths.map((width, index) => (
                <SidebarMenuItem key={index}>
                  <CustomMenuSkeleton width={width} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebar() {
  const { data: session, status } = useSession();
  const rol = session?.user?.role;
  if (status === 'loading' && !rol) {
    return <SidebarSkeleton />;
  }

  return (
    <Sidebar variant="floating" className="shadow-xs bg">
      <SidebarContent className="bg-[#025575]">
        <div className="flex flex-col items-center justify-center py-6 mb-2">
          <Image src="/images/Logo.png" alt="Logo" width={70} height={70} />
          <div className="h-10 w-auto rounded backdrop-blur-sm flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-s m-4">
              Servicio de hoteleria y más
            </span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-zinc-100"></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rol === 'administrador' &&
                adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="text-white" asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {rol === 'cliente' &&
                clientItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session?.user && (
          <NavUser userName={session.user.name} email={session.user.email} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
