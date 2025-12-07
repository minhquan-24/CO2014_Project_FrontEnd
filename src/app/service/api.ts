const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserProfile;
}


async function request<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: any
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", 
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || res.statusText || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

/**
 * API Wrapper
 */
export const api = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body?: any) => request<T>(path, "POST", body),
  put: <T>(path: string, body?: any) => request<T>(path, "PUT", body),
  patch: <T>(path: string, body?: any) => request<T>(path, "PATCH", body),
  del: <T>(path: string) => request<T>(path, "DELETE"),
};

export const authApi = {
  // 🔐 Đăng nhập
  login: (data: { email: string; password: string }) =>
    api.post<LoginResponse>("/auth/login", data),

  // 📝 Đăng ký
  register: (data: any) => 
    api.post<{ message: string; userId: string }>("/auth/register", data),

  // 🚪 Đăng xuất (Backend sẽ xóa cookie)
  logout: () => api.post<{ message: string }>("/auth/logout"),

  // 👤 Lấy thông tin user hiện tại (dựa trên Cookie)
  me: () => api.get<UserProfile>("/auth/me"),
};



export const adminApi = {
  getStats: () => api.get<any>("/admin/stats"),

  getUsers: (params?: { search?: string; role?: string; sortBy?: string; sortOrder?: string }) => {
    // Chuyển object params thành query string (?search=abc&role=Host)
    const queryString = new URLSearchParams(params as any).toString();
    return api.get<any[]>(`/admin/users?${queryString}`);
  },

  getUserDetail: (id: string) => api.get<any>(`/admin/users/${id}`),
  createUser: (data: { name: string; email: string; role: 'HOST' | 'GUEST' }) => 
    api.post<{ message: string; user: any }>("/admin/users", data),
  deleteUser: (id: string) => api.del<{ message: string }>(`/admin/users/${id}`),
  syncData: () => api.post<{ message: string }>("/admin/sync"),
};

export const userApi = {
  getProfile: () => api.get<any>("/users/profile"),
  updateProfile: (data: any) => api.put<any>("/users/profile", data),
};


export const hostApi = {
  getDashboardStats: () => api.get<any>("/hosts/dashboard"), // Backend cần tạo route này
  getMyListings: () => api.get<any[]>("/accommodation/host/my-listings"),
  createListing: (data: any) => api.post("/accommodation", data),
  updateListing: (id: string, data: any) => api.put(`/accommodation/${id}`, data),
  deleteListing: (id: string) => api.del(`/accommodation/${id}`),
  getListingDetail: (id: string) => api.get<any>(`/accommodation/${id}`),
  getAccommodationTypes: () => api.get<any[]>("/accommodation/types"),
  getListingForEdit: (id: string) => api.get<any>(`/accommodation/host/edit/${id}`),

};
