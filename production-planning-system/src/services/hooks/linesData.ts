import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linesDataService } from "../api/services/lines-data-service";

export function useGetLinesData() {
  return useQuery({
    queryKey: ['lines'],
    queryFn: linesDataService.getLinesData,
    select: data => data.data,    
  })
}

export function useCreateLineData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['lines'],
    mutationFn: linesDataService.createLineData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lines'] })
    },
  })
}

export function useUpdateLineData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBatch'],
    mutationFn: linesDataService.updateLineData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['line', data.data.id] })  
    },    
  })
}