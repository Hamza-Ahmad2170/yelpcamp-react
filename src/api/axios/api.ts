import axios, { AxiosError } from "axios";
import { auth } from "@/api/auth/index";
import { queryClient } from "@/config/queryClient";

import { tokenManager } from "./tokenManager";

const baseURL = import.meta.env.VITE_API_URL;

const publicAxios = axios.create({
  baseURL,
  timeout: 15000,
});

const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});

// This runs BEFORE every request and adds the token
privateAxios.interceptors.request.use(
  (config) => {
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
privateAxios.interceptors.response.use(
  // If response is successful, just pass it through
  (response) => response,
  async (error) => {
    // If response fails, this is where token rotation happens
    const originalRequest = error.config;

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
          const response = await auth.refresh();
          newToken = response.accessToken;

          // Store the new token
          tokenManager.setToken(newToken);

          // Tell everyone waiting in the queue about the new token
          tokenManager.processQueueSuccess(newToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return privateAxios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - notify everyone waiting and clear everything
        tokenManager.processQueueFailure(refreshError as AxiosError);
        tokenManager.clearToken();

        // Usually you'd redirect to login here
        queryClient.removeQueries({
          queryKey: ["auth"],
        });
        throw refreshError;
      }
    }
    throw error;
  },
);

export { publicAxios, privateAxios };
