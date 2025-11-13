import { api } from "@/api/axios/api";
import { endpoints } from "@/api/endpoints";
import type { ApiResponse } from "../types";
import type { User } from "@/types";
import { Delay } from "@/lib/utils";

export const userService = {
  getCurrentUser: async () => {
    // await Delay(5000);
    const resp = await api.get<ApiResponse<User>>(endpoints.users.me);
    return resp.data;
  },
};
