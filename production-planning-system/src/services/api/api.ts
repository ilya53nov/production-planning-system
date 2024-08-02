import axios from "axios";
import { MasterData, PackagingStageType } from "../../utils/types/types";
import { v4 as uuidv4 } from 'uuid';

export const BASE_URL = 'http://localhost:3123';

class BatchService {

  getBatches() {
    return axios.get<PackagingStageType[]>(`${BASE_URL}/batches`)
  }

  getComletedBatches() {
    return axios.get<PackagingStageType[]>(`${BASE_URL}/batches?packagingBatch.isBatchCompletedSap=true`)
  }

  getNotComletedBatches() {
    return axios.get<PackagingStageType[]>(`${BASE_URL}/batches?packagingBatch.isBatchCompletedSap=false`)
  }

  getBatch(id: string) {
    return axios.get(`${BASE_URL}/batches/${id}`)
  }

  createBatch(batch: PackagingStageType) {
    const id = uuidv4();
    return axios.post(`${BASE_URL}/batches`, {...batch, id})
  }

  updateBatch(batch: PackagingStageType) {
    return axios.patch(`${BASE_URL}/batches/${batch.id}`, batch)
  }
}

export const batchService = new BatchService()



class MasterDataService {

  getMasterData() {
    return axios.get<MasterData[]>(`${BASE_URL}/masterData`)
  }
}

export const masterDataService = new MasterDataService()



