import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "../api/services/master-data-service";

export function useGetMasterData() {
  return useQuery({
    queryKey: ['masterData'],
    queryFn: masterDataService.getMasterData,
    select: data => data.data,    
  })
}