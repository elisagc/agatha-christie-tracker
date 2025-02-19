import { useMutation } from '@tanstack/react-query';
import { updateReadStatus, updateUserBook } from './services';
import { queryClient } from '../queryClient';
import { UserBook } from '@/interfaces';
import toast from 'react-hot-toast';

export const useUpdateReadStatus = () => {
  return useMutation({
    mutationFn: async ({ id, read }: { id: number; read: boolean }) => {
      return updateReadStatus(id, read);
    },
    onMutate: async ({ id, read }) => {
      await queryClient.cancelQueries({ queryKey: ['userBooks'] });

      const previousBooks = queryClient.getQueryData<UserBook[]>(['userBooks']);

      queryClient.setQueryData<UserBook[]>(['userBooks'], (oldBooks) =>
        oldBooks?.map((book) => (book.id === id ? { ...book, read } : book))
      );

      return { previousBooks };
    },
    onError: (_error, _, context) => {
      if (context?.previousBooks) {
        toast.error(`Error al actualizar. Inténtalo de nuevo.`);
        queryClient.setQueryData(['userBooks'], context.previousBooks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userBooks'] });
    },
  });
};

export const useUpdateUserBook = () => {
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<UserBook>;
    }) => {
      await updateUserBook(id, updates);
      toast.success(`Libro actualizado correctamente.`);
    },
    onError: () => {
      toast.error(`Error al actualizar. Inténtalo de nuevo.`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userBooks'] });
    },
  });
};
