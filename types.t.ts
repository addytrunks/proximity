import z from "zod";

export const createUserFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, {
      message: "Username must be at most 20 characters long",
    }),
  bio: z
    .string()
    .max(200, {
      message: "Bio must be at most 200 characters long",
    })
    .min(10, {
      message: "Bio must be at least 10 characters long",
    }),
  imageUrl: z.string().url().nonempty({
    message: "Provide an image.",
  }),
});

export const createPostFormSchema = z.object({
  caption: z
    .string()
    .max(200, {
      message: "Caption must be at most 200 characters long",
    })
    .min(10, {
      message: "Caption must be at least 10 characters long",
    }),
  imageUrl: z.string().url({
    message:'Provide an image.'
  }),
  c_lat: z.string().nonempty(),
  c_long: z.string().nonempty(),
});
