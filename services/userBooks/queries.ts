import { useQuery } from '@tanstack/react-query';
import { getUserBooks } from './services';

export const useUserBooks = () => {
  return useQuery({
    queryKey: ['userBooks'],
    queryFn: getUserBooks,
  });
};
