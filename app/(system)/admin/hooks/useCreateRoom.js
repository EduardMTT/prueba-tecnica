import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createRoom = async (formData) => {
  const res = await API.post('/rooms', formData);
  return res.data;
};

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['room', 'create'],
    mutationFn: createRoom,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Habitacion guardada');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
