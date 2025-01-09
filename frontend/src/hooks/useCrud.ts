// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// export const useCrud = <T extends { id: string }>(key: string, api: any) => {
//   const queryClient = useQueryClient();

//   const fetch = useQuery<T[]>({
//     queryKey: [key],
//     queryFn: api.fetch,
//     refetchOnWindowFocus: false,
//   });

//   const create = useMutation({
//     mutationFn: api.create,
//     onMutate: (newItem: T) => {
//       queryClient.setQueryData([key], (prev: any) => [...(prev || []), newItem]);
//     },
//   });

//   const update = useMutation({
//     mutationFn: api.update,
//     onMutate: (updatedItem: T) => {
//       queryClient.setQueryData([key], (prev: any) =>
//         prev.map((item: T) => (item.id === updatedItem.id ? updatedItem : item)),
//       );
//     },
//   });

//   const remove = useMutation({
//     mutationFn: api.delete,
//     onMutate: (id: string) => {
//       queryClient.setQueryData([key], (prev: any) =>
//         prev.filter((item: T) => item.id !== id),
//       );
//     },
//   });

//   return { fetch, create, update, remove };
// };




import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCrud = <T extends { id: string }>(key: string, api: any) => {
  const queryClient = useQueryClient();

  const fetch = useQuery<T[]>({
    queryKey: [key],
    queryFn: api.fetch,
    refetchOnWindowFocus: false,
  });

  const create = useMutation({
    mutationFn: api.create,
    onMutate: async (newItem: T) => {
      queryClient.setQueryData([key], (prev: T[] = []) => [...prev, newItem]);
    },
  });

  const update = useMutation({
    mutationFn: api.update,
    onMutate: async (updatedItem: T) => {
      queryClient.setQueryData([key], (prev: T[] = []) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    },
  });

  const remove = useMutation({
    mutationFn: api.delete,
    onMutate: async (id: string) => {
      queryClient.setQueryData([key], (prev: T[] = []) =>
        prev.filter((item) => item.id !== id)
      );
    },
  });

  return { fetch, create, update, remove };
};
