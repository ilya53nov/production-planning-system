import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { packagingBatchDetailService } from "../api/services/packaging-batch-detail-service";

export function useCreatePackagingBatchDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBatchPackagingBatchDetail'],
    mutationFn: packagingBatchDetailService.createPackagingBatchDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}

export function useGetPackagingBatchDetailByBatchId(id: string) {
  return useQuery({
    queryKey: ['batch', id],
    queryFn: () => packagingBatchDetailService.getPackagingBatchDetailByBatchId(id),
    select: data => data.data,      
  })
}

export function useUpdatePackagingBatchDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBatchDetails'],
    mutationFn: packagingBatchDetailService.updatePackagingBatchDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['completedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['batches'] })      
    },
  })
}