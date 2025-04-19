import apiClient from "../api-client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await apiClient.post("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem("token");
    await apiClient.post("/auth/logout");
  },

  async getCurrentUser() {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
