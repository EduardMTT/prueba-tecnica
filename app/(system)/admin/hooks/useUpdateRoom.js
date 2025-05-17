import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const updateRoom = ({ id, formData }) =>
  API.put(`/rooms/${id}`, formData);

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['room', 'update'],
    mutationFn: updateRoom,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Habitacion actualizada');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
