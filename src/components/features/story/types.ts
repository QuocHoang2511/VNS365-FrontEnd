import { z } from "zod";

export const StoryInputSchema = z.object({
  featured_image: z.any().refine((file) => file, "Không được bỏ trống"),
  title: z
    .string()
    .trim()
    .min(1, {
      message: "validator.required",
    })
    .max(256, {
      message: "validator.max_256",
    }),

  description: z.string().trim().min(1, {
    message: "Không được bỏ trống",
  }),
  content: z.string().trim().min(1, {
    message: "Không được bỏ trống",
  }),
  cooking_method: z.string().trim().min(1, {
    message: "Không được bỏ trống",
  }),
  region_id: z.string().trim().min(1, {
    message: "Không được bỏ trống",
  }),
});

export type StoryInputType = z.infer<typeof StoryInputSchema>;
