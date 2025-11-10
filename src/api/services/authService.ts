import { api } from "@/api/axios/api";
import { endpoints } from "@/api/endpoints";
import type { ApiResponse } from "../types";
import type { Auth } from "@/types";

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await api.post<ApiResponse<Auth>>(
      endpoints.auth.login,
      {
        email,
        password,
      },
      {
        skipAuth: true,
        withCredentials: true,
      },
    );
  },
  signup: async (email: string, password: string) => {
    return await api.post<ApiResponse<Auth>>(
      endpoints.auth.signup,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  },
  refresh: async () => {
    return await api.post<ApiResponse<Auth>>(
      endpoints.auth.refresh,
      {},
      { skipAuth: true, withCredentials: true },
    );
  },
};
