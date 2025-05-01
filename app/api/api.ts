import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8081";

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface JwtResponse {
  token: string;
  user: User;
}

export interface Appointment {
  id: number;
  appointmentNumber: string;
  patient: User;
  employee?: User;
  status: string;
  appointmentDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Test {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  id: number;
  appointment: Appointment;
  test: Test;
  result: string;
  notes?: string;
  resultDate: string;
  employee: User;
  createdAt: string;
  updatedAt: string;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration and errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    // Handle specific error cases
    if (error.response?.data) {
      const errorData = error.response.data as {
        error?: string;
        message?: string;
      };
      error.message =
        errorData.error || errorData.message || "An unexpected error occurred";
    }

    return Promise.reject(error);
  }
);

// Auth-related API calls
export const login = async (
  credentials: LoginRequest
): Promise<JwtResponse> => {
  try {
    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signup = async (userData: SignupRequest): Promise<JwtResponse> => {
  try {
    const response = await api.post("/auth/signup", userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const adminLogin = async (
  credentials: LoginRequest
): Promise<JwtResponse> => {
  try {
    const response = await api.post("/auth/admin/login", credentials);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error("Error logging in as admin:", error);
    throw error;
  }
};

export const employeeLogin = async (
  credentials: LoginRequest
): Promise<JwtResponse> => {
  try {
    const response = await api.post("/auth/employee/login", credentials);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error("Error logging in as employee:", error);
    throw error;
  }
};

// Appointment-related API calls
export const bookAppointment = async (
  appointment: Omit<
    Appointment,
    "id" | "appointmentNumber" | "status" | "createdAt" | "updatedAt"
  >
): Promise<Appointment> => {
  try {
    const response = await api.post("/dashboard/book-appointment", appointment);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const getMyAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get("/dashboard/appointments");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Admin appointment management
export const getAppointmentsByStatus = async (
  status: string
): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/dashboard/admin/appointments/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments by status:", error);
    throw error;
  }
};

export const updateAppointmentStatus = async (
  id: number,
  status: string
): Promise<Appointment> => {
  try {
    const response = await api.put(
      `/dashboard/admin/appointments/${id}/status`,
      status
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

// Employee appointment management
export const getEmployeeAppointments = async (
  status: string
): Promise<Appointment[]> => {
  try {
    const response = await api.get(
      `/dashboard/employee/appointments/${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee appointments:", error);
    throw error;
  }
};

export const markAppointmentCollected = async (
  id: number
): Promise<Appointment> => {
  try {
    const response = await api.put(
      `/dashboard/employee/appointments/${id}/collect`
    );
    return response.data;
  } catch (error) {
    console.error("Error marking appointment as collected:", error);
    throw error;
  }
};

// Test management
export const createTest = async (
  test: Omit<Test, "id" | "createdAt" | "updatedAt">
): Promise<Test> => {
  try {
    const response = await api.post("/dashboard/admin/test", test);
    return response.data;
  } catch (error) {
    console.error("Error creating test:", error);
    throw error;
  }
};

export const updateTest = async (
  id: number,
  test: Partial<Test>
): Promise<Test> => {
  try {
    const response = await api.put(`/dashboard/admin/test/${id}`, test);
    return response.data;
  } catch (error) {
    console.error("Error updating test:", error);
    throw error;
  }
};

export const deleteTest = async (id: number): Promise<void> => {
  try {
    await api.delete(`/dashboard/admin/test/${id}`);
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
};

export const getAllTests = async (): Promise<Test[]> => {
  try {
    const response = await api.get("/dashboard/admin/test");
    return response.data;
  } catch (error) {
    console.error("Error fetching all tests:", error);
    throw error;
  }
};

export const getActiveTests = async (): Promise<Test[]> => {
  try {
    const response = await api.get("/dashboard/employee/test-detail");
    return response.data;
  } catch (error) {
    console.error("Error fetching active tests:", error);
    throw error;
  }
};

// Test result management
export const addTestResult = async (
  testResult: Omit<TestResult, "id" | "createdAt" | "updatedAt">
): Promise<TestResult> => {
  try {
    const response = await api.post(
      "/dashboard/employee/test-result",
      testResult
    );
    return response.data;
  } catch (error) {
    console.error("Error adding test result:", error);
    throw error;
  }
};

// Report generation
export const getSalesReport = async (
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await api.get("/dashboard/admin/report/sales", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating sales report:", error);
    throw error;
  }
};

export const getEmployeeReport = async (
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await api.get("/dashboard/admin/report/employee", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating employee report:", error);
    throw error;
  }
};

export const getSampleCollectionReport = async (
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await api.get(
      "/dashboard/employee/report/sample-collection",
      {
        params: { startDate, endDate },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating sample collection report:", error);
    throw error;
  }
};

export const getPerformanceReport = async (
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await api.get("/dashboard/employee/report/performance", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating performance report:", error);
    throw error;
  }
};
