import { request } from "@/libs/request";
// import { ProductWithAll } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

interface Props {
  query: string;
}

const useSearch = ({ query }: Props) => {
  return useQuery<any[]>({
    queryKey: ["search", query],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);

      const query = queryKey[1];

      const res = await request.get("/api/search", {
        params: {
          query,
        },
      });

      return res.data;
    },
    enabled: !!query,
  });
};

export { useSearch };
