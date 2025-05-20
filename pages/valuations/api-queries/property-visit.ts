import apiClient from '@/helpers/api-client';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { PropertyVisit } from '../models';

async function getPropertyVisitById(id: string | number) {
  const response = await apiClient.get(`property_visits/${id}`);
  return response.data;
}

async function getPropertyVisitOptions() {
  const response = await apiClient.get('property_visit_options');
  return response.data;
}

async function getDocumentsByPropertyVisitId(id: string | number) {
  const response = await apiClient.get(
    `property_visits/${id}/property_visit_documents`
  );
  return response.data;
}

async function addPropertyVisit(data: PropertyVisit) {
  const response = await apiClient.post(
    `properties/${data.property_id}/property_visits`,
    {
      valuations_property_visit: data,
    }
  );
  return response.data;
}
async function updatePropertyVisit(data: PropertyVisit) {
  const response = await apiClient.put(`property_visits/${data.id}`, {
    valuations_property_visit: data,
  });
  return response.data;
}

export const usePropertyVisitById = (id: string | number): UseQueryResult => {
  return useQuery({
    queryKey: [`property_visits/${id}`],
    queryFn: () => getPropertyVisitById(id),
    enabled: !!id,
  });
};

export const usePropertyVisitOptions = (): UseQueryResult => {
  return useQuery({
    queryKey: ['property_visit_options'],
    queryFn: getPropertyVisitOptions,
  });
};

export const useAddPropertyVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPropertyVisit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`valuations/${data.valuation_id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`property_visits/${data.id}`],
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
      });
    },
  });
};

export const useUpdatePropertyVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePropertyVisit,
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
      });
      queryClient.invalidateQueries({
        queryKey: [`valuations/${data.valuation_id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`property_visits/${data.id}`],
      });
    },
  });
};

export const useGetDocumentsByPropertyVisitId = (id: string | number) => {
  return useQuery({
    queryKey: ['property_visit_documents'],
    queryFn: () => getDocumentsByPropertyVisitId(id),
    enabled: !!id,
  });
};
