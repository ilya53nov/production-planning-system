import axios from "axios";
import { PackagingStageType } from "../../utils/types/types";

export const BASE_URL = 'http://localhost:3123';

class BatchService {

  getBatches() {
    return axios.get<PackagingStageType[]>(`${BASE_URL}/batches`)
  }

  getBatch(id: string) {
    return axios.get(`${BASE_URL}/batches/${id}`)
  }

  createBatch(batch: PackagingStageType) {
    return axios.post(`${BASE_URL}/batches`, batch)
  }
}

export const  batchService = new BatchService()



