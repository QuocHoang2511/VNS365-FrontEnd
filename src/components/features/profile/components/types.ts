import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const UserInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  email: z
    .string()
    .email({
      message: "Email không hợp lệ",
    })
    .min(1, {
      message: notEmptyMessage("Email"),
    }),
  phone_number: z.string().min(1, {
    message: notEmptyMessage("Số điện thoại"),
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
});

export type UserInputType = z.infer<typeof UserInputSchema>;

export const ChangePasswordInputSchema = z
  .object({
    current_password: z.string().min(1, {
      message: notEmptyMessage("Mật khẩu hiện tại"),
    }),
    new_password: z.string().min(1, {
      message: notEmptyMessage("Mật khẩu mới"),
    }),
    confirm_password: z.string().min(1, {
      message: notEmptyMessage("Xác nhận mật khẩu"),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirm_password"],
      });
    }
    return data;
  });

export type ChangePasswordInputType = z.infer<typeof ChangePasswordInputSchema>;

export const RecommendRestaurantInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên nhà hàng"),
  }),
  description: z.string().min(1, {
    message: notEmptyMessage("Mô tả nhà hành"),
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
  phone_number: z.string().min(1, {
    message: notEmptyMessage("Số điện thoại"),
  }),
  image: z.string().min(1, {
    message: notEmptyMessage("Ảnh"),
  }),
  province_id: z.string().min(1, {
    message: notEmptyMessage("Tỉnh thành"),
  }),
});

export type RecommendRestaurantInputType = z.infer<
  typeof RecommendRestaurantInputSchema
>;
