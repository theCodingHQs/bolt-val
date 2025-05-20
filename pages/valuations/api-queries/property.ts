import apiClient from '@/helpers/api-client';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

async function getPropertyById(id: string | number) {
  const response = await apiClient.get(`properties/${id}`);
  return response.data;
}

async function updatePropertyVisitDelay(data: {
  id: number;
  visit_rescheduled_date?: string;
  visit_delay_reason?: string;
}) {
  const response = await apiClient.put(`${data.id}/property_visit_delayed`, {
    valuations_property: data,
  });
  return response.data;
}

export const usePropertyById = (id: string | number): UseQueryResult => {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
};

export const useUpdatePropertyVisitDelay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePropertyVisitDelay,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`valuations/${data.valuation_id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`valuations`],
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
      });
    },
  });
};
