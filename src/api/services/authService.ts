import { api } from "@/api/axios/api";
import { endpoints } from "@/api/endpoints";
import type { ApiResponse } from "../types";
import type { Auth } from "@/types";
import type { Login, SignUp } from "@/schema/user";

export const authService = {
  login: async (formData: Login) => {
    return await api.post<ApiResponse<Auth>>(
      endpoints.auth.login,
      {
        ...formData,
      },
      {
        skipAuth: true,
        withCredentials: true,
      },
    );
  },
  signup: async (formData: SignUp) => {
    return await api.post<ApiResponse<Auth>>(
      endpoints.auth.signup,
      {
        ...formData,
      },
      {
        skipAuth: true,
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
