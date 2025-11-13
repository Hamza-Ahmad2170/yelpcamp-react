export const endpoints = {
  auth: {
    login: `/auth/login`,
    signup: `/auth/signup`,
    refresh: `/auth/refresh`,
    logout: `/auth/logout`,
  },
  campgrounds: {
    all: (limit = 10, page = 1) => `/campgrounds?limit=${limit}&page=${page}`,
    single: (id: string) => `/campgrounds/${id}`,
    create: `/campgrounds`,
    update: (id: string) => `/campgrounds/${id}`,
    delete: (id: string) => `/campgrounds/${id}`,
  },
  users: {
    me: `/users/me`,
  },
} as const;
