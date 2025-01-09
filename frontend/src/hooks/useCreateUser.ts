// import { useMutation } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/react-query';

// export const useCreateUser = () => {
//   const queryClient = new QueryClient();
//   return useMutation({
//     mutationFn: async (user: User) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
//       return Promise.resolve();
//     },
//     onMutate: (newUserInfo: User) => {
//       queryClient.setQueryData(
//         ['users'],
//         (prevUsers: any) =>
//           [
//             ...prevUsers,
//             {
//               ...newUserInfo,
//               id: (Math.random() + 1).toString(36).substring(7),
//             },
//           ] as User[],
//       );
//     },
//   });
// };

// hooks/useCreateUser.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useCreateUser = () => {
  return useMutation((newUser: any) => axios.post('/api/users', newUser));
};

export default useCreateUser;
