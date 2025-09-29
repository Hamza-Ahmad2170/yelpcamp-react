// src/types/api.ts
interface ApiResponse {
  success: boolean;
  message: string;
}

interface ApiResponseData<T> extends ApiResponse {
  data: T;
}

export type { ApiResponse, ApiResponseData };
