import { NewStoreResponse } from './../interfaces/server';
import axios from 'axios';
import { Sale } from '../interfaces/sale';
import { Store } from '../interfaces/store';
import { getAuthHeaders } from './auth';

const API_URL = '/stores';

export const getAllStores = async (): Promise<Store[]> => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.get(API_URL, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getStoreSales = async (storeId: number): Promise<Sale[]> => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.get(`${API_URL}/${storeId}/sales`, headers);
    return response.data.data.sales;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addStore = async (store: Store): Promise<NewStoreResponse> => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.post(`${API_URL}`, store, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
