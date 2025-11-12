import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate, useLocation } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services";
import { tokenManager } from "@/api/axios/tokenManager";

import { signUpSchema, type SignUp } from "@/schema/user";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import InputPassword from "@/components/ui/InputPassword";

function SignupPage() {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (values: SignUp) => authService.signup(values),
    onSuccess: ({ data }) => {
      tokenManager.setToken(data.data.accessToken);
      navigate("/campgrounds", { replace: true });
    },
    onError: (error) => {
      if (isAxiosError(error))
        toast.error(error.response?.data?.message || "something went wrong");
      form.reset();
    },
  });

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (user && !isLoading) return <Navigate to="/campgrounds" replace />;

  const onSubmit: SubmitHandler<SignUp> = (data) => mutate(data);

  return (
    <div className="min-h-[calc(100dvh-64px)] content-center">
      <div className="mx-auto w-full max-w-md space-y-3 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-center text-2xl font-semibold">Join YelpCamp!</h1>
        <p className="text-muted-foreground text-center">
          Start your adventure by creating an account.
        </p>
        <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-2 gap-5">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-full"
                >
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-full"
                >
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <InputPassword
                    placeholder="Enter your password"
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-full"
                >
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <InputPassword
                    placeholder="Confirm your password"
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              variant="forest"
              type="submit"
              className="col-span-full"
              // disabled={isPending}
            >
              Sign up
            </Button>
          </FieldGroup>
        </form>
        <p className="text-muted-foreground mt-6 text-center text-xs">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignupPage;
