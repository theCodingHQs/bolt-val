import apiClient from '@/helpers/api-client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

async function getValuations() {
  const response = await apiClient.get('valuations');
  return response.data;
}

async function getAllValuations() {
  const response = await apiClient.get('all_valuations');
  return response.data;
}

async function getValuationById(id: string | number) {
  const response = await apiClient.get(`valuations/${id}`);
  return response.data;
}

export const useValuations = (): UseQueryResult => {
  return useQuery({
    queryKey: ['valuations'],
    queryFn: getValuations,
  });
};

export const useValuationById = (id: string | number): UseQueryResult => {
  return useQuery({
    queryKey: [`valuations/${id}`],
    queryFn: () => getValuationById(id),
    enabled: !!id,
  });
};
