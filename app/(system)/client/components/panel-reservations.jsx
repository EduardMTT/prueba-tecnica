'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlusCircle, Calendar, AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';
import { useReservations } from '@/app/(system)/hooks/useReservations';
import { useUpdateReservation } from '@/app/(system)/hooks/useUpdateReservation';
import DialogCreateReservation from '../../admin/components/dialog-create-reservation';
import { DialogDeleteReservation } from '../../components/dialog-delete-reservation';

export default function PanelReservations() {
  const { isPending, data: reservations, isError, error } = useReservations();
  const updateReservationMutation = useUpdateReservation();

  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [deleteButtonHovered, setIsDeleteHovered] = useState(null);

  const handleDialogChange = (open) => {
    setIsOpenDialogAdd(open);
  };

  const handleUpdate = async (reservation) => {
    await updateReservationMutation.mutateAsync({
      id: reservation.id,
      formData: { ...reservation, Status: 'canceled' },
    });
  };
  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Reservaciones</h2>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message ||
            'Ocurrió un error al cargar las reservaciones. Por favor, intente nuevamente.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No hay reservaciones</h3>
        <p className="text-muted-foreground mt-2 mb-6">
          No se encontraron reservaciones en el sistema.
        </p>
        <Button
          onClick={() => {
            setIsOpenDialogAdd(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear nueva reservación
        </Button>
        <DialogCreateReservation
          isOpenDialogAdd={isOpenDialogAdd}
          handleClose={handleDialogChange}
        />
      </div>
    );
  }

  return (
    <>
      <DialogCreateReservation
        isOpenDialogAdd={isOpenDialogAdd}
        handleClose={handleDialogChange}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reservaciones</h2>
          <Button onClick={() => setIsOpenDialogAdd(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva reservación
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <Card
              key={reservation.id}
              className={`overflow-hidden transition-all duration-200${
                deleteButtonHovered === reservation.id
                  ? 'shadow-lg bg-red-300'
                  : 'overflow-hidden transition-all duration-200 hover:shadow-lg border-l-4 border-l-cyan-500'
              } h-full`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    <Calendar className="mr-1 h-3 w-3" />
                    {dayjs(reservation.request_date).format('DD/MM/YYYY')}
                  </Badge>
                  {reservation.Status && (
                    <Badge
                      className={
                        reservation.Status === 'accepted'
                          ? 'bg-green-600'
                          : reservation.Status === 'pending'
                          ? 'bg-yellow-600'
                          : reservation.Status === 'rejected'
                          ? 'bg-red-600'
                          : 'secondary'
                      }
                    >
                      {reservation.Status === 'accepted'
                        ? 'Aceptada'
                        : reservation.Status === 'pending'
                        ? 'Pendiente'
                        : reservation.Status === 'rejected'
                        ? 'Rechazada'
                        : 'Cancelada'}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  {reservation.user.name}
                </CardTitle>
                {reservation.user.email && (
                  <CardDescription>{reservation.user.email}</CardDescription>
                )}
              </CardHeader>

              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('View details for', reservation.id);
                  }}
                >
                  Ver detalles
                </Button>
                <Button size="sm" onClick={() => handleUpdate(reservation)}>
                  Cancelar
                </Button>
                <DialogDeleteReservation
                  id={reservation.id}
                  setDeleteButtonHovered={setIsDeleteHovered}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
