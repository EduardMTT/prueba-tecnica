import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useDeleteReservation } from '../hooks/useDeleteReservation';

export function DialogDeleteReservation({ setDeleteButtonHovered, id }) {
  const deleteReservationMutation = useDeleteReservation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          onMouseEnter={() => setDeleteButtonHovered(id)}
          onMouseLeave={() => setDeleteButtonHovered(null)}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Desea eliminar la reservación seleccionada?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará la reservación y sus detalles definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-950"
            onClick={() => deleteReservationMutation.mutate(id)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
