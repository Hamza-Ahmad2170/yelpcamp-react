import { api } from "@/api/axios/api";
import { endpoints } from "@/api/endpoints";
import type { ApiResponse } from "../types";
import type { Auth } from "@/types";
import type { Login, SignUp } from "@/schema/user";

export const authService = {
  login: async (formData: Login) => {
    const res = await api.post<ApiResponse<Auth>>(
      endpoints.auth.login,
      {
        ...formData,
      },
      {
        skipAuth: true,
        withCredentials: true,
      },
    );
    return res.data;
  },
  signup: async (formData: SignUp) => {
    const resp = await api.post<ApiResponse<Auth>>(
      endpoints.auth.signup,
      {
        ...formData,
      },
      {
        skipAuth: true,
        withCredentials: true,
      },
    );
    return resp.data;
  },
  refresh: async () => {
    const resp = await api.post<ApiResponse<Auth>>(
      endpoints.auth.refresh,
      {},
      { skipAuth: true, withCredentials: true },
    );
    return resp.data;
  },
  logout: async () => {
    const resp = await api.post<ApiResponse<Auth>>(
      endpoints.auth.logout,
      {},
      { withCredentials: true },
    );
    return resp.data;
  },
};
