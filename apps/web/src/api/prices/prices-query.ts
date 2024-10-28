import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPrice, deletePrice, updatePrice } from './price';

export const useUpdatePriceQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePrice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company'],
        type: 'active',
      });
    },
  });
};

export const useCreatePriceQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company'],
        type: 'active',
      });
    },
  });
};

export const useDeletePriceQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePrice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company'],
        type: 'active',
      });
    },
  });
};
