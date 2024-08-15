import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { MASTER_DATA_BASE_URL } from "../../../utils/constants/constants"
import { LinesData } from "../../../utils/types/master-data-types";

class LinesDataService {
  getLinesData() {
    return axios.get<LinesData[]>(`${MASTER_DATA_BASE_URL}/linesData`)
  }

  createLineData(line: LinesData) {
    const id = uuidv4();
    return axios.post<LinesData>(`${MASTER_DATA_BASE_URL}/linesData`, {...line, id})
  }

  updateLineData(line: LinesData) {
    return axios.patch<LinesData>(`${MASTER_DATA_BASE_URL}/linesData/${line.id}`, line)
  }


}

export const linesDataService = new LinesDataService();