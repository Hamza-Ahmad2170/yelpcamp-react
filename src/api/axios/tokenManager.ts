import type { AxiosError } from "axios";

interface RefreshQueue {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (error: AxiosError) => void;
}

class TokenManager {
  private accessToken: string | null = null;
  private isRefreshing = false;
  private refreshQueue: RefreshQueue[] = [];

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken(): string | null {
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
  }

  addToQueue(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.refreshQueue.push({ resolve, reject });
    });
  }

  processQueueSuccess(newToken: string) {
    this.refreshQueue.forEach(({ resolve }) => resolve(newToken));
    this.refreshQueue = [];
    this.isRefreshing = false;
  }

  processQueueFailure(error: AxiosError) {
    this.refreshQueue.forEach(({ reject }) => reject(error));
    this.refreshQueue = [];
    this.isRefreshing = false;
  }

  getIsRefreshing(): boolean {
    return this.isRefreshing;
  }

  setIsRefreshing(value: boolean) {
    this.isRefreshing = value;
  }
}

export const tokenManager = new TokenManager();
