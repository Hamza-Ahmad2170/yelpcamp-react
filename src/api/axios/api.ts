import axios, { AxiosError } from "axios";
import { authService } from "@/api/services";
import { queryClient } from "@/config/queryClient";

import { tokenManager } from "./tokenManager";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

// This runs BEFORE every request and adds the token
api.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;
    const token = tokenManager.getToken();
    if (token) {
      // Attach token to every request automatically
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// This runs AFTER every response and handles token rotation
api.interceptors.response.use(
  // If response is successful, just pass it through
  (response) => response,
  async (error) => {
    // If response fails, this is where token rotation happens
    const originalRequest = error.config;
    if (originalRequest?.skipAuth) throw error;

    // Check: Is this a 401 (unauthorized) error?
    // And have we already tried to fix this request?
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let newToken: string;
        if (tokenManager.getIsRefreshing()) {
          newToken = await tokenManager.addToQueue();
        } else {
          // We're the first to notice the expired token, so WE handle the refresh
          tokenManager.setIsRefreshing(true);

          // Call your refresh endpoint
          const response = await authService.refresh();
          newToken = response.data.data.accessToken;

          // Store the new token
          tokenManager.setToken(newToken);

          // Tell everyone waiting in the queue about the new token
          tokenManager.processQueueSuccess(newToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - notify everyone waiting and clear everything
        tokenManager.processQueueFailure(refreshError as AxiosError);
        tokenManager.clearToken();

        queryClient.invalidateQueries({
          queryKey: ["auth"],
          refetchType: "none",
        });

        throw refreshError;
      }
    }
    throw error;
  },
);

export { api };
