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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCreateUser } from '@/app/hooks/useCreateUser';

export default function Register() {
  const createUsuarioMutation = useCreateUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    const { confirmPassword, ...userData } = data;
    try {
      console.log('Datos enviados:', userData);
      createUsuarioMutation.mutateAsync(userData);
      router.push('/auth/login');
    } catch (error) {
      toast.error('Error al registrar el usuario');
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#c8faf6] p-4">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-xl">
        <div className="w-auto m-4 text-center font-bold text-2xl">
          <p>Hotel W punta de mita</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-[#11de40] to-[#5debf2]"></div>
        <CardHeader>
          <CardTitle className="text-center">Crear cuenta</CardTitle>
          <CardDescription className="text-center text-[#025575]/70">
            ¡Únete y empieza a disfrutar!
          </CardDescription>
          <CardContent>
            <form className="pt-3" onSubmit={onSubmit}>
              <div className="gap-3 flex flex-col">
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="name" className="text-gray-700">
                    Nombre
                  </Label>
                  <Input
                    {...register('name', {
                      required: 'Nombre es requerido',
                    })}
                    id="name"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Apellidos
                  </Label>
                  <Input
                    {...register('lastName', {
                      required: 'El apellido es requerido',
                    })}
                    id="lastName"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="email" className="text-gray-700">
                    Correo
                  </Label>
                  <Input
                    {...register('email', {
                      required: 'Correo es requerido',
                    })}
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="phone" className="text-gray-700">
                    Telefono
                  </Label>
                  <Input
                    {...register('phone', {
                      required: 'Telefono requerido',
                    })}
                    id="phone"
                    type="phone"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="password" className="text-gray-700">
                    Contraseña
                  </Label>
                  <Input
                    {...register('password', {
                      required: 'Contraseña requerida',
                      minLength: { value: 6, message: 'Mínimo 6 caracteres' },
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

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirmar contraseña
                  </Label>
                  <Input
                    {...register('confirmPassword', {
                      required: 'Confirma tu contraseña',
                    })}
                    id="confirmPassword"
                    type="password"
                    placeholder="*******"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#11de40] hover:bg-[#11de40]/90 text-[#025575] font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  Registrar
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
