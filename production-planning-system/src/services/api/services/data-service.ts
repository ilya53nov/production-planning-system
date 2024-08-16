import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

interface DataServiceInterface<T> {
  getAll(): void,
  getById(id: string): void,
  create(data: T): void,
  update(data: T, id: string): void,
  delete?(id: string): void,
}

class DataService<T> implements DataServiceInterface<T> {
  baseUrl: string
  service: string

  constructor(baseUrl: string, service: string) {
    this.baseUrl = baseUrl
    this.service = service
  }

  getAll() {
    console.log(`${this.baseUrl}/${this.service}`)
    return axios.get<T[]>(`${this.baseUrl}/${this.service}`)
  }

  getById(id: string) {
    return axios.get<T>(`${this.baseUrl}/${this.service}/${id}`)
  }

  create(data: T) {
    const id = uuidv4();
    return axios.post<T>(`${this.baseUrl}/${this.service}`, {...data, id})
  }

  update(data: T, id: string) {
    return axios.patch<T>(`${this.baseUrl}/${this.service}/${id}`, data)
  }

  delete(id: string) {
    return axios.delete<T>(`${this.baseUrl}/${this.service}/${id}`)
  }
}

export default DataService;