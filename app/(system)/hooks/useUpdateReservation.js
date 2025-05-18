import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const updateReservation = ({ id, formData }) =>
  API.put(`/reservations/${id}`, formData);

export function useUpdateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['reservation', 'update'],
    mutationFn: updateReservation,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Reservacion actualizada');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}
