import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteUser = (id) => API.delete(`/users/${id}`);

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['user', 'delete'],
    mutationFn: deleteUser,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Usuario eliminado');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
