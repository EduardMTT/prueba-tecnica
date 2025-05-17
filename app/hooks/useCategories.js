import { API } from '@/lib/API';
import { useQuery } from '@tanstack/react-query';

export const getCategories = async () => {
  const res = await API.get('/categories');
  return res.data;
};

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.categories,
  });
}
