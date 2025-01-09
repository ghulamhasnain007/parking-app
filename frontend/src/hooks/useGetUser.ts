
import { useQuery } from "@tanstack/react-query";
import { User,fakeData } from "../components/makeData";
// import { fakeData } from "../components/makeData";

export const useGetUsers = () => {
    return useQuery<User[]>({
      queryKey: ['users'],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
        return Promise.resolve(fakeData);
      },
      refetchOnWindowFocus: false,
    });
  }