import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['room', 'delete'],
    mutationFn: deleteRoom,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Habitacion eliminada');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
