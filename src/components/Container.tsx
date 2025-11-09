import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

function Container({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn("mx-auto w-full max-w-7xl px-4 lg:px-8", className)}
      {...props}
    />
  );
}
export default Container;
