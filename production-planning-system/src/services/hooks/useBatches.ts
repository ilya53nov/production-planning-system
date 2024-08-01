import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { batchService } from "../api/api";

export function useBatches() {
  return useQuery({
    queryKey: ['batches'],
    queryFn: batchService.getBatches,
    select: data => data.data,    
  })
}

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBatch'],
    mutationFn: batchService.createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}