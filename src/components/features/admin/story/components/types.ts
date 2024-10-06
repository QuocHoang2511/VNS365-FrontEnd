import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

const roleSchema = z.enum(["ADMIN", "USER"]);

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
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
  role: roleSchema,
});

export type UserInputType = z.infer<typeof UserInputSchema>;
export type RoleType = z.infer<typeof roleSchema>;

export const StoryFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  region: z.string().optional(),
});

export type StoryFilterType = z.infer<typeof StoryFilterSchema>;
