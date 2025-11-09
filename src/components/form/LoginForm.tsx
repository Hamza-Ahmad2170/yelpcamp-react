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
} from "@/components/ui/dialog";
import InputPassword from "@/components/ui/InputPassword";

import { Separator } from "@/components/ui/separator";

function LoginForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="w-full shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Welcome Back!
            </DialogTitle>
            <Separator className="my-4" />
            <DialogDescription>
              Log in to continue your adventure.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
              />
              <FieldError />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputPassword id="password" name="password" />
              <FieldError />
            </Field>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default LoginForm;
