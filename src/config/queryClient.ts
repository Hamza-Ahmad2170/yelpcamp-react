import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) =>
        error instanceof AxiosError && error.response?.status === 401
          ? false
          : failureCount < 1,
    },
    mutations: {
      retry: (failureCount, error: unknown) =>
        error instanceof AxiosError && error.response?.status === 401
          ? false
          : failureCount < 1,
    },
  },
});
