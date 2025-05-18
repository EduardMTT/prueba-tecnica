import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const updateUser = ({ id, formData }) =>
  API.put(`/users/${id}`, formData);

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['user', 'update'],
    mutationFn: updateUser,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Usuario actualizado');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
