import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const updateCategory = ({ id, formData }) =>
  API.put(`/categories/${id}`, formData);

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['category', 'update'],
    mutationFn: updateCategory,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Categoria actualizada');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
