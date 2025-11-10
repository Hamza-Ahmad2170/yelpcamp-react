import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import InputPassword from "@/components/ui/InputPassword";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Login } from "@/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services";
import { tokenManager } from "@/api/axios/tokenManager";
import { useSession } from "@/hooks/useSession";
import { useState } from "react";

function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Login) => authService.login(values),
    onSuccess: ({ data }) => {
      tokenManager.setToken(data.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setIsOpen(false);
    },
    onError: () => {
      console.log("error");
    },
  });

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: Login) => mutate(data);

  // const { user, isLoading, error } = useSession();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        className="w-full shadow-2xl sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Welcome Back!</DialogTitle>
            <DialogClose asChild>
              <X className="size-5 cursor-pointer text-gray-400 transition-colors hover:text-gray-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Log in to continue your adventure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          <DialogFooter>
            <Button
              variant="forest"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default LoginForm;
