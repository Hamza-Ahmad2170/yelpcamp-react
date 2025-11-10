import { userService } from "@/api/services";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type CurrentUserContextType = {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
};

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

function SessionProvider({ children }: React.PropsWithChildren) {
  const { data, isPending, error } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: userService.getCurrentUser,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <CurrentUserContext
      value={{
        user: data,
        isLoading: isPending,
        error,
      }}
    >
      {children}
    </CurrentUserContext>
  );
}

export { SessionProvider, CurrentUserContext };
