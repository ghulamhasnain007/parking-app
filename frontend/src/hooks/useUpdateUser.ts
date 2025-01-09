import { useMutation } from '@tanstack/react-query';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export const  useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user: User) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
        return Promise.resolve();
      },
      onMutate: (newUserInfo: User) => {
        queryClient.setQueryData(['users'], (prevUsers: any) =>
          prevUsers?.map((prevUser: User) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
          ),
        );
      },
    });
  }