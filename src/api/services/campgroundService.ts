import { api } from "@/api/axios/api";
import { endpoints } from "@/api/endpoints";
import type { ApiResponse, PaginatedData } from "@/api/types";
import type { Campground } from "@/types";

export const campgroundService = {
  getAllCampgrounds: async (limit?: number, page?: number) => {
    const resp = await api.get<
      ApiResponse<PaginatedData & { campgrounds: Campground[] }>
    >(endpoints.campgrounds.all(limit, page));
    return resp.data;
  },
  getCampgroundById: async (id: string) => {
    const resp = await api.get(endpoints.campgrounds.single(id));
    return resp.data;
  },
};
