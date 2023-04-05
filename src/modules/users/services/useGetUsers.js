import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useGetUsers = (params, option) =>
  useQuery(["users", params], () => request.get(`users`, { params }), {
    ...option,
  });

export function useInvalidateUser() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["users"]);
}

export default useGetUsers;
