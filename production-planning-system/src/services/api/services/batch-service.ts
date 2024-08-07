import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from "../../../utils/constants/constants";
import { PackagingBatchDetailType, PackagingBatchType } from "../../../utils/types/types";

type createBatchDetailTestProps = {
  id: string,
  packagingBatchDetail: PackagingBatchDetailType
}

class BatchService {

  getBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches`)
  }

  getComletedBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=true`)
  }



  getNotComletedBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=false`)
  }

  //GET /posts?_embed=comments

  getNotComletedBatchesWithPackagingDetail() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetail&isBatchCompletedSap=false`)
  }

  // getNotComletedBatchesWithPackagingDetailByLine(line: string) {
  //   return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetail&isBatchCompletedSap=false&line=${line}`)
  // }

  getNotComletedBatchesWithPackagingDetailByLine(line: string) {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetail`)
  }

  getBatchById(id: string) {
    return axios.get<PackagingBatchType>(`${BASE_URL}/batches/${id}`)
  }

  createBatch(batch: PackagingBatchType) {
    const id = uuidv4();
    return axios.post(`${BASE_URL}/batches`, {...batch, id})
  }



  // createBatchDetailTest(createBatchDetailTestProps: createBatchDetailTestProps) {
  //   return axios.patch(`${BASE_URL}/batches/${createBatchDetailTestProps.id}`, createBatchDetailTestProps.packagingBatchDetail)
  // }

  // createBatchDetail(batch: PackagingBatchType) {
  //   return axios.patch(`${BASE_URL}/batches/${batch.id}`, batch)
  // }

  updateBatch(batch: PackagingBatchType) {
    return axios.patch(`${BASE_URL}/batches/${batch.id}`, batch)
  }
}

export const batchService = new BatchService()