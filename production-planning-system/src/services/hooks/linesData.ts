import { useQuery } from "@tanstack/react-query";
import { linesDataService } from "../api/services/lines-data-service";

export function useGetLinesData() {
  return useQuery({
    queryKey: ['linesData'],
    queryFn: linesDataService.getLinesData,
    select: data => data.data,    
  })
}