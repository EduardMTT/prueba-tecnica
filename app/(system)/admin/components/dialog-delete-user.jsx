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
import { useDeleteUser } from '../hooks/useUserDelete';

export function DialogDeleteUser({ setDeleteButtonHovered, id }) {
  const deleteUserMutation = useDeleteUser();
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
            ¿Desea eliminar el usuario seleccionado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará el usuario definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-950"
            onClick={() => deleteUserMutation.mutate(id)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
