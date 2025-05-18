import { API } from '@/lib/API';
import { useQuery } from '@tanstack/react-query';

export const getUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    select: (data) => data.users,
  });
}
