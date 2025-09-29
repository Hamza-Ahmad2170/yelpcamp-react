import { auth } from "@/api/auth";
import { tokenManager } from "@/api/axios/tokenManager";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type SessionContextType = {
  loading: boolean;
  user: User | undefined;
  error: unknown;
  refetch: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

function SessionProvider({ children }: Props) {
  const isMounted = useRef(false);
  // const [isInitialized, setIsInitialized] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: auth.getSession,
    retry: false,
    staleTime: Infinity,
    enabled: false, // We'll manually trigger this
  });

  const { mutate: refreshMutate, ...refreshMutation } = useMutation({
    mutationFn: auth.refresh,
    onSuccess: async (data) => {
      tokenManager.setToken(data.accessToken);
      // Now fetch the session
      await refetch();
      // setIsInitialized(true);
    },
    onError: () => {
      tokenManager.clearToken();
      // setIsInitialized(true);
    },
  });

  // useEffect(() => {
  //   const existingToken = tokenManager.getToken();
  //   if (existingToken) {
  //     // We already have a token, just fetch session
  //     // refetch().finally(() => setIsInitialized(true));
  //   } else {
  //     // No token, try to refresh
  //     refreshMutate();
  //   }
  // }, [refreshMutate, refetch]);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    refreshMutate();
  }, [refreshMutate]);

  // Debug logs
  console.log("SessionProvider state:", {
    // isInitialized,
    isRefreshPending: refreshMutation.isPending,
    isSessionLoading: isLoading,
    sessionData: !!data,
    sessionError: error,
    refreshError: refreshMutation.error,
    hasToken: !!tokenManager.getToken(),
  });

  // const loading = !isInitialized || refreshMutation.isPending || isLoading;
  const loading = refreshMutation.isPending || isLoading;

  return (
    <SessionContext.Provider
      value={{
        loading,
        user: data?.user,
        error: error || refreshMutation.error,
        refetch,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export { SessionProvider, SessionContext };
