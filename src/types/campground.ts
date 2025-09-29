interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data: T;
}

interface Campground {
  _id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { ApiResponse, Campground };
