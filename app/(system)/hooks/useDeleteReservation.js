import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteReservation = (id) => API.delete(`/reservations/${id}`);

export function useDeleteReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['reservation', 'delete'],
    mutationFn: deleteReservation,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Reservacion eliminada');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}
