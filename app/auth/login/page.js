'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res.error) {
      toast.error(res.error, {
        position: 'top-center',
        description: 'Verifica tu correo y contraseña',
        icon: '❌',
      });
    } else {
      const sesion = await getSession();
      const role = sesion.user.role;
      toast.success('Bienvenido', {
        description: sesion.user.name,
        position: 'top-center',
        icon: '🎉',
      });

      if (role === 'administrador') {
        router.push('/admin');
      } else if (role === 'cliente') {
        router.push('/client');
      }
    }
  });

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#c8faf6] p-4">
        <Card className="w-full max-w-md overflow-hidden border-none shadow-xl">
          <div className="w-auto m-4 text-center font-bold text-2xl">
            <p>Inicia Sesion</p>
          </div>
          <div className="h-2 bg-gradient-to-r from-blue-800 to-[#5debf2]"></div>
          <CardHeader>
            <CardTitle className="text-center">Bienvenido!</CardTitle>
            <CardDescription className="text-center text-[#025575]/70">
              Ingresa tu correo y contraseña para acceder a tu cuenta
            </CardDescription>
            <CardContent>
              <form className="pt-3" onSubmit={onSubmit}>
                <div className="gap-3 flex flex-col">
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="email" className="text-gray-700">
                      Correo
                    </Label>
                    <Input
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Correo es requerido',
                        },
                      })}
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="password" className="text-gray-700">
                      Contraseña
                    </Label>
                    <Input
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Contraseña requerida',
                        },
                      })}
                      id="password"
                      type="password"
                      placeholder="*******"
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-[#11de40]/60 hover:text-blue-950 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
