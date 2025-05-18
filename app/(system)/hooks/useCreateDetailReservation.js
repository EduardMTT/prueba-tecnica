import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createDetails = async (details) => {
  const res = await API.post('/details', details);
  return res.data;
};

export function useCreateDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDetails,
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
      toast.success('Detalles de reservacion guardados');
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });
}
