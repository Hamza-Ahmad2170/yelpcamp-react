import { useId, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InputPassword = ({ ...props }: React.ComponentProps<"input">) => {
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  return (
    <div className="relative">
      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        className="pr-9"
        {...props}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible((prevState) => !prevState)}
        className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
      >
        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        <span className="sr-only">
          {isVisible ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};

export default InputPassword;
