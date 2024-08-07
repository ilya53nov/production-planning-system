import axios from "axios"
import { LinesData } from "../../../utils/types/types"
import { BASE_URL } from "../../../utils/constants/constants"

class LinesDataService {
  getLinesData() {
    return axios.get<LinesData[]>(`${BASE_URL}/linesData`)
  }
}

export const linesDataService = new LinesDataService()