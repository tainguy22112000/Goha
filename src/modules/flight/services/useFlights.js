import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useFlights = (params, option) =>
  useQuery(["flights", params], () => request.get(`flights`, { params }), {
    ...option,
  });

export function useInvalidateFlight() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["flights"]);
}

export default useFlights;
