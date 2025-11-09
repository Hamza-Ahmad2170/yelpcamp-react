interface ApiResponse<T = unknown> {
  status: "success" | "fail" | "error";
  statusCode: number;
  message: string;
  data: T;
}

interface PaginatedData {
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export type { ApiResponse, PaginatedData };
