import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const RegisterInputSchema = z
  .object({
    username: z.string().min(1, {
      message: notEmptyMessage("Tên"),
    }),
    email: z
      .string()
      .min(1, {
        message: notEmptyMessage("Email"),
      })
      .email({
        message: "Email không hợp lệ",
      }),

    password: z.string().min(1, {
      message: "Mật khẩu không được bỏ trống",
    }),
    phone_number: z.string().min(1, {
      message: notEmptyMessage("Số điện thoại"),
    }),
    address: z.string().min(1, {
      message: notEmptyMessage("Địa chỉ"),
    }),
    confirmPassword: z.string().min(1, {
      message: "Nhập lại mật khẩu không được bỏ trống",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterInputType = z.infer<typeof RegisterInputSchema>;
