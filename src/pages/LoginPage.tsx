import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export function LoginPage() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = (data: Login) => mutate(data);

  return (
    <div>
      <div className="min-h-[calc(100dvh-64px)] content-center">
        <div className="mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl backdrop-blur">
          <div className="space-y-3">
            <h1 className="text-center text-2xl font-semibold">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground text-center">
              Log in to continue your adventure.
            </p>
            <form className="space-y-4">
              <FieldGroup>
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
              </FieldGroup>
              <FieldGroup>
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
              </FieldGroup>
              <Button
                variant="forest"
                type="submit"
                className="w-full"
                // disabled={isPending}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
