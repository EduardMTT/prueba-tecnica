import { API } from '@/lib/API';
import { useQuery } from '@tanstack/react-query';

export const getRooms = async (page, categoryId) => {
  const res = await API.get('/rooms', {
    params: {
      page,
      categoryId: categoryId !== 0 ? categoryId : undefined,
    },
  });
  return res.data;
};

export function useRooms({ page = 1, categoryId = null } = {}) {
  return useQuery({
    queryKey: ['rooms', page, categoryId],
    queryFn: () => getRooms(page, categoryId),
    select: (data) => data.rooms,
  });
}
