import { publicAxios, privateAxios } from "@/api/axios/api";

import type { ApiResponseData } from "@/api/types/api";
import type { AuthResponse, Session } from "@/api/auth/types";

const auth = {
  async getSession() {
    const { data } =
      await privateAxios.get<ApiResponseData<Session>>("/auth/session");
    return data.data;
  },

  async login(email: string, password: string) {
    const { data } = await publicAxios.post<ApiResponseData<AuthResponse>>(
      "/auth/login",

      { email, password },
      { withCredentials: true },
    );
    return data.data;
  },

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const { data } = await publicAxios.post<ApiResponseData<AuthResponse>>(
      "/auth/signup",
      { email, password, firstName, lastName },
      { withCredentials: true },
    );
    return data.data;
  },

  async refresh() {
    const { data } = await publicAxios.post<ApiResponseData<AuthResponse>>(
      "/auth/refresh",
      {},
      {
        withCredentials: true,
      },
    );
    return data.data;
  },
};

export { auth };
