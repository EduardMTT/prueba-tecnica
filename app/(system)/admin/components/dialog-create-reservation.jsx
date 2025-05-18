'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import dayjs from 'dayjs';
import { useCreateReservation } from '@/app/(system)/hooks/useCreateReservation';
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
import { toast } from 'sonner';

const formSchema = z.object({
  reservation_date: z
    .string()
    .refine((dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(), {
      message: 'La fecha de reserva es requerida',
    }),
  departure_date: z
    .string()
    .refine((dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(), {
      message: 'La fecha de salida es requerida',
    }),
});

export default function DialogCreateReservation({
  isOpenDialogAdd,
  handleClose,
}) {
  const createReservationMutation = useCreateReservation();
  const isSubmitting = createReservationMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservation_date: '',
      departure_date: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = {
        request_date: dayjs().startOf('day').toISOString(),
        reservation_date: dayjs(values.reservation_date)
          .startOf('day')
          .toISOString(),
        departure_date: dayjs(values.departure_date)
          .startOf('day')
          .toISOString(),
      };

      await createReservationMutation.mutateAsync(data);
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicita una nueva reservacion</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="room-form">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="reservation_date"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel
                        htmlFor="reservation_date"
                        className="sm:text-right"
                      >
                        Fecha a reservar
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="reservation_date"
                          type="date"
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
                name="departure_date"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel
                        htmlFor="departure_date"
                        className="sm:text-right"
                      >
                        Fecha de salida
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="departure_date"
                          type="date"
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
