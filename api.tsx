class Cache<T> {
  private store: Map<string, T> = new Map();

  get(key: string): T | undefined {
    return this.store.get(key);
  }

  set(key: string, value: T): void {
    this.store.set(key, JSON.stringify(value));
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}

const responseCache = new Cache<AxiosResponse<any>>();

import axios, { AxiosResponse } from 'axios';

export const listEscrows = async (): Promise<AxiosResponse<Escrow[]>> => {
  const cacheKey = '/escrows';
  
  if (responseCache.has(cacheKey)) {
    return Promise.resolve(responseCache.get(cacheKey) as AxiosResponse<Escrow[]>);
  }

  const response = await apiClient.get('/escrows');
  responseCache.set(cacheKey, response);
  return response;
}

export const createEscrow = async (escrowData: Omit<Escrow, 'id' | 'status'>): Promise<AxiosResponse<Escrow>> => {
  const response = await apiClient.post('/escrows', escrowData);
  responseCache.clear();
  return response;
}