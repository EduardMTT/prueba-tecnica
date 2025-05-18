import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createReservation = async (reservation) => {
  const res = await API.post('/reservations', reservation);
  return res.data;
};

export function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReservation,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
        return;
      }
    },

    onSuccess: () => {
      toast.success('Reservacion guardada');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}
