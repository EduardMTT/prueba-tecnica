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
import { useDeleteCategory } from '../hooks/useDeleteCategory';

export function DialogDeleteCategory({ setDeleteButtonHovered, id }) {
  const deleteCategoryMutation = useDeleteCategory();
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
            ¿Desea eliminar la categoria seleccionada?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará la categoria y sus habitaciones
            definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-950"
            onClick={() => deleteCategoryMutation.mutate(id)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
