import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteCategory = (id) => API.delete(`/categories/${id}`);

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['category', 'delete'],
    mutationFn: deleteCategory,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Categoria eliminada');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
