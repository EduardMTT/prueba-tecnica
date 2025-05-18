'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUpdateUser } from '../hooks/useUpdateUser';

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no debe tener más de 15 dígitos'),
  role: z.enum(['administrador', 'cliente']).optional(),
});
export default function DialogEditUser({
  isOpenDialogEdit,
  handleClose,
  currentUser,
}) {
  const updateUserMutation = useUpdateUser();

  const isSubmitting = updateUserMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      password: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        role: currentUser.role,
      });
    }
  }, [currentUser, form]);

  const handleUpdateUser = async (data) => {
    try {
      console.log('Datos a enviar:', data);
      await updateUserMutation.mutateAsync({
        id: currentUser.id,
        formData: data,
      });
      handleClose();
    } catch (error) {
      console.error('Error al editar el usuario', error);
    }
  };

  return (
    <Dialog open={isOpenDialogEdit} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateUser)} id="user-form">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="name" className="sm:text-right">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="lastName" className="sm:text-right">
                        Apellidos
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          {...field}
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="email" className="sm:text-right">
                        Correo
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          {...field}
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="phone" className="sm:text-right">
                        Telefono
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="phone"
                          {...field}
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel>Rol</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrador">
                              Administrador
                            </SelectItem>
                            <SelectItem value="cliente">Cliente</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0466df] text-white hover:bg-[#048fdf]"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
