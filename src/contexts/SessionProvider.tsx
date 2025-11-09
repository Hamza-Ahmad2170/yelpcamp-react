import { userService } from "@/api/services";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type CurrentUserContextType = {
  user: User | undefined;
  isLoading: boolean;
};

interface Props {
  children: React.ReactNode;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

function SessionProvider({ children }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: userService.getCurrentUser,
    select: (data) => data.data,
  });

  return (
    <CurrentUserContext
      value={{
        user: data,
        isLoading,
      }}
    >
      {children}
    </CurrentUserContext>
  );
}

export { SessionProvider, CurrentUserContext };
