import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createUser = async (user) => {
  const res = await API.post('/users', user);
  return res.data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
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
      toast.success('Usuario guardado');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
