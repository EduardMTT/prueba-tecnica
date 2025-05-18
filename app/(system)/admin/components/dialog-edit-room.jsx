'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUpdateRoom } from '../hooks/useUpdateRoom';

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  capacity: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: 'La capacidad debe ser un número válido',
        required_error: 'La capacidad es requerida',
      })
      .refine((val) => val > 0, {
        message: 'La capacidad debe ser seleccionada',
      })
  ),
  cost: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: 'El costo debe ser un número válido',
        required_error: 'El costo es requerido',
      })
      .refine((val) => val > 0, {
        message: 'El costo debe ser definido',
      })
  ),
});

export default function DialogEditRoom({
  isOpenDialogEdit,
  handleClose,
  currentRoom,
}) {
  const updateRoomMutation = useUpdateRoom();
  const isSubmitting = updateRoomMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: '',
      cost: '',
    },
  });

  useEffect(() => {
    if (currentRoom) {
      form.reset({
        name: currentRoom.name || '',
        description: currentRoom.description || '',
        capacity: currentRoom.capacity || '',
        cost: currentRoom.cost || '',
      });
    }
  }, [currentRoom, form]);

  const handleUpdateRoom = async (data) => {
    try {
      console.log('Datos a enviar:', data);
      console.log('room:', currentRoom.id);
      await updateRoomMutation.mutateAsync({
        id: currentRoom.id,
        formData: data,
      });
      handleClose();
    } catch (error) {
      console.error('Error al editar la habitacion', error);
    }
  };

  return (
    <Dialog open={isOpenDialogEdit} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar categoría</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateRoom)} id="room-form">
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel
                        htmlFor="description"
                        className="sm:text-right"
                      >
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
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
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="capacity" className="sm:text-right">
                        Capacidad
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="capacity"
                          type="number"
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
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="cost" className="sm:text-right">
                        Costo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="cost"
                          type="number"
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
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
