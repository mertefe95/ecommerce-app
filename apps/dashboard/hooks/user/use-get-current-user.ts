'use client';
import { axiosInstance } from '../../common/api';

import { User } from '../../interfaces/user';
import { useQuery } from '@tanstack/react-query';

export default function useGetCurrentUser() {
  const { isLoading, error, data, refetch } = useQuery<User>({
    queryKey: ['login'],
    queryFn: async () => {
      const data = await axiosInstance.get('admin/me');
      return data.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    currentUser: data,
    isLoading,
    error,
    getCurrentUser: refetch,
  };
}
