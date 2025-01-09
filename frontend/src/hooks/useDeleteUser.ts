import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';


export const useDeleteUser = ()=> {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
        return Promise.resolve();
      },
      onMutate: (userId: string) => {
        queryClient.setQueryData(['users'], (prevUsers: any) =>
          prevUsers?.filter((user: User) => user.id !== userId),
        );
      },
    });
  }