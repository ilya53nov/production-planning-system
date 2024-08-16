import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinesData } from "../../utils/types/master-data-types";
import DataService from "../api/services/data-service";
import { MASTER_DATA_BASE_URL } from "../../utils/constants/constants";

const linesDataService = new DataService<LinesData>(MASTER_DATA_BASE_URL, 'linesData');

export function useGetLinesData() {
  return useQuery({
    queryKey: ['lines'],
    queryFn: () => linesDataService.getAll(),
    select: data => data.data,    
  })
}

export function useCreateLineData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['lines'],
    mutationFn: (data: LinesData) => linesDataService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lines'] })
    },
  })
}

export function useUpdateLineData() {
  const queryClient = useQueryClient();

  type props = {
    data: LinesData,
    id: string,
  }

  return useMutation({
    mutationKey: ['updateBatch'],
    mutationFn: ({data, id}: props) => linesDataService.update(data, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['line', data.data.id] })
      queryClient.invalidateQueries({ queryKey: ['lines'] })
    },    
  })
}

export function useDeleteLineData() {
  const queryClient = useQueryClient();

  type props = {
    id: string
  }

  return useMutation({
    mutationKey: ['lines'],
    mutationFn: ({id}: props) => linesDataService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lines'] })
    },
  })
}