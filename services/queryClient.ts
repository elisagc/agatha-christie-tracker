import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Mutations invalidate ['userBooks'], so cached data is safe to reuse
      // instead of refetching on every mount (e.g. opening the book modal).
      staleTime: 5 * 60 * 1000,
    },
  },
});
