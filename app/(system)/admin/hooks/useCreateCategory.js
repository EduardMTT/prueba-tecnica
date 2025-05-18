import { API } from '@/lib/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createCategory = async (formData) => {
  const res = await API.post('/categories', formData);
  return res.data;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['category', 'create'],
    mutationFn: createCategory,
    onError: (error) => {
      const errors = error?.response?.data?.fieldErrors ?? {};
      const firstField = Object.keys(errors)[0];

      if (firstField) {
        const firstError = errors[firstField][0];
        toast.error(firstError);
      }
    },
    onSuccess: () => {
      toast.success('Categoria guardada');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
