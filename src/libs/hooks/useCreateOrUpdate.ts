import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface Props {
  queryKey: string;
  endpointAPI: string;
  id?: number;
}

export const useCreateOrUpdate = ({ endpointAPI, queryKey, id }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: any) => {
      const isEdit = !!id;

      if (!isEdit) {
        const res = await request(`${endpointAPI}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: item,
        });
        return res.data;
      }

      const res = await request(`${endpointAPI}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data: item,
      });
      return res.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Thành công",
        message: "Thành công",
        color: "green",
      });

      router.back();
    },
    onError: (error: any) => {
      notifications.show({
        title: "Đã xảy ra lỗi",
        message: error.response.data.message,
        color: "red",
      });

      throw new Error(error.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};
