import request from "@/utils/request";
import { useQuery } from "react-query";

export default function useGetUser(id, option) {
  return useQuery(["user", id], () => request.get(`users/${id}`), {
    ...option,
  });
}
