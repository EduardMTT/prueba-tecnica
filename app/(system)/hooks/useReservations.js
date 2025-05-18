import { API } from '@/lib/API';
import { useQuery } from '@tanstack/react-query';

export const getReservations = async (page, status) => {
  const res = await API.get('/reservations', {
    params: {
      page,
      status: status !== null ? status : 'pending',
    },
  });
  return res.data;
};

export function useReservations({ page = 1, status = 'pending' } = {}) {
  return useQuery({
    queryKey: ['reservations', page, status],
    queryFn: () => getReservations(page, status),
    select: (data) => data.reservations,
  });
}
