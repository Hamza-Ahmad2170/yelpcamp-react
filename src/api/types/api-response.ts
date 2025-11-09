// types/api.ts
export interface ApiSuccessWithData<T> {
  status: "success";
  statusCode: number;
  message?: string;
  data: T;
}

export interface ApiSuccessNoData {
  status: "success";
  statusCode: number;
  message?: string;
}

export type ApiError<E = unknown> = {
  status: "fail" | "error";
  statusCode: number;
  message: string;
  details?: E;
};

// Union helper if you want to accept either form
export type ApiResponse<T, E = unknown> =
  | ApiSuccessWithData<T>
  | ApiSuccessNoData
  | ApiError<E>;
