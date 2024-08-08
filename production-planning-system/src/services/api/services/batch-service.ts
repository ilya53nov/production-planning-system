import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from "../../../utils/constants/constants";
import { PackagingBatchDetailType, PackagingBatchType } from "../../../utils/types/types";
import { packagingBatchDetailService } from "./packaging-batch-detail-service";

type createBatchDetailTestProps = {
  id: string,
  packagingBatchDetail: PackagingBatchDetailType
}

class BatchService {

  getBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetails`)
  }

  getComletedBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=true`)
  }



  getNotComletedBatches() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=false`)
  }

  //GET /posts?_embed=comments

  // getNotComletedBatchesWithPackagingDetail() {
  //   const batches = axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=false`);

  //   const data = batches.map((batch) => {
  //     const packagingBatchDetails = packagingBatchDetailService.getPackagingBatchDetailByBatchId(batch.id!)
  //     return packagingBatchDetails;
  //   })

  //   return data;

  //   //return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?isBatchCompletedSap=false`)
  // }

  getNotComletedBatchesWithPackagingDetail() {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetails&isBatchCompletedSap=false`)
  }

  getNotComletedBatchesWithPackagingDetailByLine(line: string) {
    return axios.get<PackagingBatchType[]>(`${BASE_URL}/batches?_embed=packagingBatchDetails&isBatchCompletedSap=false&line=${line}`)
  }

  getBatchById(id: string) {
    return axios.get<PackagingBatchType>(`${BASE_URL}/batches/${id}?_embed=packagingBatchDetail`)
    //return axios.get<PackagingBatchType>(`${BASE_URL}/batches/${id}/packagingBatchDetail`)
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