import axios from 'axios';
import { AxiosResponse } from 'axios';

type Escrow = {
  id: string;
  amount: number;
  sender: string;
  receiver: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const listEscrows = async (): Promise<AxiosResponse<Escrow[]>> => {
  return apiClient.get('/escrows');
}

export const createEscrow = async (escrowData: Omit<Escrow, 'id' | 'status'>): Promise<AxiosResponse<Escrow>> => {
  return apiClient.post('/escrows', escrowData);
}

export const updateEscrow = async (id: string, escrowData: Partial<Escrow>): Promise<AxiosResponse<Escrow>> => {
  return apiClient.patch(`/escrows/${id}`, escrowData);
}

export const deleteEscrow = async (id: string): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/escrows/${id}`);
}

export const completeEscrow = async (id: string): Promise<AxiosResponse<Escrow>> => {
  return updateEscrow(id, { status: 'COMPLETED' });
}

export const cancelEscrow = async (id: string): Promise<AxiosResponse<Escrow>> => {
  return updateEscrow(id, { status: 'CANCELLED' });
}