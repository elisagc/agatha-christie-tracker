'use client';

import { FiltersProvider } from '@/store/useFiltersStore';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <FiltersProvider>{children}</FiltersProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
