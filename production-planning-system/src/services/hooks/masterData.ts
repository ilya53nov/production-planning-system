import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { masterDataService } from "../api/services/master-data-service";
import { linesDataService } from "../api/services/lines-data-service";
import { LinesData } from "../../utils/types/master-data-types";

export function useGetMasterData() {
  return useQuery({
    queryKey: ['masterData'],
    queryFn: masterDataService.getMasterData,
    select: data => data.data,    
  })
}

