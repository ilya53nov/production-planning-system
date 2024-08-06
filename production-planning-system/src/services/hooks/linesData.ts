import { useQuery } from "@tanstack/react-query";
import { linesDataService } from "../api/api";

export function useGetLinesData() {
  return useQuery({
    queryKey: ['linesData'],
    queryFn: linesDataService.getLinesData,
    select: data => data.data,    
  })
}