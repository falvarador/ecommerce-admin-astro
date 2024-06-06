import { defineAction, z } from "astro:actions";

export const server = {
  singIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email({
        message: "The email address is badly formatted.",
      }),
      password: z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters long.",
        })
        .max(16, {
          message: "Password must be at most 16 characters long.",
        }),
    }),
    handler: async ({ email, password }, context) => {
      // Search the user
      console.log("Sing in...", email, password);

      return context.redirect("/");
    },
  }),

  singUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email({
        message: "The email address is badly formatted.",
      }),
      password: z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters long.",
        })
        .max(16, {
          message: "Password must be at most 16 characters long.",
        }),
    }),
    handler: async ({ email, password }, context) => {
      console.log("Sing up...", email, password);

      return context.redirect("/");
    },
  }),
};
