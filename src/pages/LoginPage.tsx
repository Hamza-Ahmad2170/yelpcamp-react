import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/api/services";
import { tokenManager } from "@/api/axios/tokenManager";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/InputPassword";
import { loginSchema, type Login } from "@/schema/user";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";

function LoginPage() {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();
  // const location = useLocation();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Login) => authService.login(values),
    onSuccess: ({ data }) => {
      tokenManager.setToken(data.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/campgrounds", { replace: true });
    },
    onError: (error) => {
      if (isAxiosError(error))
        toast.error(error.response?.data?.message || "something went wrong");
      form.reset();
    },
  });

  if (user && !isLoading) return <Navigate to="/campgrounds" replace />;

  const onSubmit: SubmitHandler<Login> = (data) => mutate(data);

  return (
    <div className="min-h-[calc(100dvh-64px)] content-center">
      <div className="mx-auto w-full max-w-md space-y-3 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-center text-2xl font-semibold">Welcome Back!</h1>
        <p className="text-muted-foreground text-center">
          Log in to continue your adventure.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
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
                <Field data-invalid={fieldState.invalid}>
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
            <Button
              variant="forest"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Log in
            </Button>
          </FieldGroup>
        </form>
        <p className="text-muted-foreground mt-6 text-center text-xs">
          Don"t have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
