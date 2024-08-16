import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MASTER_DATA_BASE_URL } from "../../utils/constants/constants";
import { PackagingBatchDetailType } from "../../utils/types/types";
import DataService from "../api/services/data-service";

const packagingBatchDetailService = new DataService<PackagingBatchDetailType>(MASTER_DATA_BASE_URL, 'packagingBatchDetails');

export function useCreatePackagingBatchDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBatchPackagingBatchDetail'],
    mutationFn: (data: PackagingBatchDetailType) => packagingBatchDetailService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}

export function useGetPackagingBatchDetailByBatchId(id: string) {
  return useQuery({
    queryKey: ['batch', id],
    queryFn: () => packagingBatchDetailService.getById(id),
    select: data => data.data,      
  })
}

export function useUpdatePackagingBatchDetails() {
  const queryClient = useQueryClient();

  type props = {
    data: PackagingBatchDetailType,
    id: string,
  }

  return useMutation({
    mutationKey: ['updateBatchDetails'],
    mutationFn: ({data, id}: props) => packagingBatchDetailService.update(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notCompletedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['completedBatches'] })
      queryClient.invalidateQueries({ queryKey: ['batches'] })      
    },
  })
}