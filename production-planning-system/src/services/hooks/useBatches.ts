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
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
    },
  })
}

export function useUpdateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBatch'],
    mutationFn: batchService.updateBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['completedBatches'] })
    },
  })
}

export function useGetCompletedBatches() {
  return useQuery({
    queryKey: ['completedBatches'],
    queryFn: batchService.getComletedBatches,
    select: data => data.data,    
  })
}

export function useGetNotCompletedBatches() {
  return useQuery({
    queryKey: ['notCompletedBatches'],
    queryFn: batchService.getNotComletedBatches,
    select: data => data.data,    
  })
}