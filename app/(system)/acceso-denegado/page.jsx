'use client';

import { useRouter } from 'next/navigation';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';

export default function AccessDeniedPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const goHome = () => {
    if (session?.user?.role === 'administrador') {
      router.push('/admin');
    } else if (session?.user?.role === 'cliente') {
      router.push('/client');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full mx-4 shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Acceso Denegado
          </CardTitle>
          <CardDescription className="text-gray-500">
            No tienes permisos para acceder a esta sección
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Esta área está restringida y requiere permisos específicos para
            acceder. Si crees que deberías tener acceso, por favor contacta al
            administrador del sistema.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            className="w-full sm:w-auto bg-blue-700 text-white"
            onClick={goHome}
          >
            <Home className="mr-2 h-4 w-4" />
            Ir al Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
