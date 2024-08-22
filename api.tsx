import axios, { AxiosResponse } from 'axios';

class ResponseCache<T> {
  private cacheStore: Map<string, T> = new Map();

  getCachedResponse(key: string): T | undefined {
    return this.cacheStore.get(key);
  }

  setCachedResponse(key: string, value: T): void {
    this.cacheStore.set(key, JSON.stringify(value));
  }

  isResponseCached(key: string): boolean {
    return this.cacheStore.has(key);
  }

  clearCache(): void {
    this.cacheStore.clear();
  }
}

const escrowResponseCache = new ResponseCache<AxiosResponse<any>>();

export const fetchAllEscrows = async (): Promise<AxiosResponse<Escrow[]>> => {
  const escrowsCacheKey = '/escrows';
  
  if (escrowResponseCache.isResponseCached(escrowsCacheKey)) {
    return Promise.resolve(escrowResponseCache.getCachedResponse(escrowsCacheKey) as AxiosResponse<Escrow[]>);
  }

  const escrowsResponse = await apiClient.get('/escrows');
  escrowResponseCache.setCachedResponse(escrowsCacheKey, escrowsResponse);
  return escrowsResponse;
}

export const createNewEscrow = async (escrowData: Omit<Escrow, 'id' | 'status'>): Promise<AxiosResponse<Escrow>> => {
  const newEscrowResponse = await apiClient.post('/escrows', escrowData);
  escrowResponseCache.clearCache();
  return newEscrowResponse;
}