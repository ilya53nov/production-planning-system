import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MASTER_DATA_BASE_URL } from "../../utils/constants/constants";
import { ProductData } from "../../utils/types/master-data-types";
import DataService from "../api/services/data-service";

const productsDataService = new DataService<ProductData>(MASTER_DATA_BASE_URL, 'productsData');

export function useGetProductsData() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsDataService.getAll(),
    select: data => data.data,    
  })
}

export function useCreateProductData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['products'],
    mutationFn: (data: ProductData) => productsDataService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProductData() {
  const queryClient = useQueryClient();

  type props = {
    data: ProductData,
    id: string,
  }

  return useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: ({data, id}: props) => productsDataService.update(data, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product', data.data.id] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },    
  })
}

export function useDeleteProductData() {
  const queryClient = useQueryClient();

  type props = {
    id: string
  }

  return useMutation({
    mutationKey: ['products'],
    mutationFn: ({id}: props) => productsDataService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}