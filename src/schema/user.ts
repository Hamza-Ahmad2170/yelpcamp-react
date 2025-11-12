import z from "zod";

const email = z
  .string()
  .nonempty({
    message: "Email is required",
  })
  .trim()
  .toLowerCase()
  .pipe(z.email());

const password = z
  .string()
  .nonempty({
    message: "Password is required",
  })
  .trim();

const loginSchema = z.object({
  email,
  password,
});

const signUpSchema = z
  .object({
    email,
    firstName: z
      .string()
      .nonempty({
        message: "First name is required",
      })
      .trim()
      .toLowerCase(),
    lastName: z
      .string()
      .nonempty({
        message: "Last name is required",
      })
      .trim()
      .toLowerCase(),
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Login = z.infer<typeof loginSchema>;
type SignUp = z.infer<typeof signUpSchema>;

export { loginSchema, type Login, signUpSchema, type SignUp };
