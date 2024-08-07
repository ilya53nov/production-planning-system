import axios from "axios"
import { MasterData } from "../../../utils/types/types"
import { BASE_URL } from "../../../utils/constants/constants"

class MasterDataService {

  getMasterData() {
    return axios.get<MasterData[]>(`${BASE_URL}/masterData`)
  }
}

export const masterDataService = new MasterDataService()