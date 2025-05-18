'use client';

import { useState } from 'react';
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
import { useCreateDetails } from '../../hooks/useCreateDetailReservation';
import { useCreateReservation } from '@/app/(system)/hooks/useCreateReservation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { number, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PanelSelectRoom } from './panel-select-room';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z
  .object({
    reservation_date: z
      .string()
      .refine(
        (dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(),
        {
          message: 'La fecha de reserva es requerida',
        }
      ),
    departure_date: z
      .string()
      .refine(
        (dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(),
        {
          message: 'La fecha de salida es requerida',
        }
      ),
    room_id: z.number().optional(),
  })
  .refine((data) => !!data.room_id, {
    message: 'Debe seleccionar una habitación',
    path: ['room_id'],
  });

export default function DialogCreateReservation({
  isOpenDialogAdd,
  handleClose,
}) {
  const createReservationMutation = useCreateReservation();
  const createDetailMutation = useCreateDetails();
  const isSubmitting = createReservationMutation.isPending;
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [formStep, setFormStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservation_date: '',
      departure_date: '',
      room_id: '',
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

      const res = await createReservationMutation.mutateAsync(data);

      if (res) {
        const details = {
          reservationId: res.id,
          roomId: values.room_id,
        };
        await createDetailMutation.mutateAsync(details);
      }

      form.reset();
      setSelectedRoomId(null);
      setFormStep(1);
      closeAndReset(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    form.setValue('room_id', roomId);
  };

  const closeAndReset = (open) => {
    if (!open) {
      form.reset();
      setSelectedRoomId(null);
      setFormStep(1);
    }
    handleClose(open);
  };

  const handleNext = () => {
    form.trigger(['reservation_date', 'departure_date']).then((isValid) => {
      if (isValid) {
        setFormStep(2);
      }
    });
  };

  const handleBack = () => {
    setFormStep(1);
  };

  return (
    <Dialog open={isOpenDialogAdd} onOpenChange={closeAndReset}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicita una nueva reservación</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="room-form">
            {formStep === 1 ? (
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
                            min={dayjs().format('YYYY-MM-DD')}
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
                            min={
                              form.watch('reservation_date') ||
                              dayjs().format('YYYY-MM-DD')
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-end" />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">
                  Selecciona una habitación
                </h3>
                <FormField
                  control={form.control}
                  name="room_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input type="hidden" {...field} />
                      </FormControl>
                      <PanelSelectRoom
                        onSelectRoom={handleSelectRoom}
                        selectedRoomId={selectedRoomId}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {createReservationMutation.isError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {createReservationMutation.error?.message ||
                        'Hubo un error al crear la reservación'}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </form>
        </Form>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          {formStep === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => closeAndReset(false)}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Siguiente
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Atrás
              </Button>
              <Button
                type="submit"
                form="room-form"
                disabled={isSubmitting || !selectedRoomId}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Guardando...' : 'Confirmar reservación'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
