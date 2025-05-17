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
import { useDeleteRoom } from '../hooks/useDeleteRoom';

export function DialogDeleteRoom({ setDeleteButtonHovered, id }) {
  const deleteRoomMutation = useDeleteRoom();
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
            ¿Desea eliminar la habitacion seleccionada?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará la habitacion definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-950"
            onClick={() => deleteRoomMutation.mutate(id)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
