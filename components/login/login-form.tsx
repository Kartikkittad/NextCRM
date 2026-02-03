import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 w-[27rem]", className)} {...props}>
      <FieldGroup className="bg-muted p-12 rounded-lg bg-[#212126]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl text-white font-bold">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <hr className="hr" />
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-gray-200 text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button
            className="bg-white text-black cursor-pointer hover:bg-gray-200"
            type="submit"
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
