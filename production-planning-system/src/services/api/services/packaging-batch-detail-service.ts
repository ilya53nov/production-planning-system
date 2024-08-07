import axios from "axios"
import { BASE_URL } from "../../../utils/constants/constants"
import { PackagingBatchDetailType } from "../../../utils/types/types"
import { v4 as uuidv4 } from 'uuid';

class PackagingBatchDetailService {

  // createPackagingBatchDetail() {
  //   return axios.post<PackagingBatchDetailType>(`${BASE_URL}/packagingBatchDetail`)
  // }

  createPackagingBatchDetail(packagingBatchDetail: PackagingBatchDetailType) {
    const id = uuidv4();
    return axios.post<PackagingBatchDetailType>(`${BASE_URL}/packagingBatchDetail`, {...packagingBatchDetail, id})
  }

  getPackagingBatchDetailByBatchId(id: string) {
    return axios.get<PackagingBatchDetailType[]>(`${BASE_URL}/packagingBatchDetail?batchId=${id}`)
  }

}

export const packagingBatchDetailService = new PackagingBatchDetailService()