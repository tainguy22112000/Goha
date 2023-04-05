import request from "@/utils/request";
import { useQuery } from "react-query";

export default function useGetFlight(id, option) {
  return useQuery(["flights", id], () => request.get(`flights/${id}`), {
    ...option,
  });
}
