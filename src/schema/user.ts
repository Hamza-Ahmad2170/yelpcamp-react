import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .trim()
    .toLowerCase()
    .pipe(z.email()),
  password: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .trim(),
});

type Login = z.infer<typeof loginSchema>;

export { loginSchema, type Login };
