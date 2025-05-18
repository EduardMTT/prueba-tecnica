'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRoom } from '../hooks/useCreateRoom';
import { Plus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

export default function DialogCreateRoom({
  isOpenDialogAdd,
  handleClose,
  categoryId,
}) {
  const createRoomMutation = useCreateRoom();
  const isSubmitting = createRoomMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: 0,
      cost: 0,
      categoryId: categoryId,
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
        categoryId: categoryId,
      };

      await createRoomMutation.mutateAsync(data);
      form.reset();
      closeAndReset(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeAndReset = (open) => {
    handleClose(open);
  };

  return (
    <Dialog open={isOpenDialogAdd} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Agregar habitación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar nueva habitación</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="room-form">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="name" className="sm:text-right">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
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
                          {...field}
                          id="description"
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
          </form>
        </Form>

        <DialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeAndReset(false)}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Cerrar
          </Button>

          <Button
            type="submit"
            form="room-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar habitación'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
