import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8081/api";

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
      window.location.href = "/login";
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
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
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

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

// Post-related API calls
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (postData: {
  title: string;
  content: string;
}) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  postData: { title: string; content: string }
) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// Comment-related API calls
export const getComments = async (postId: number) => {
  try {
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (commentData: {
  content: string;
  postId: number;
}) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (
  id: number,
  commentData: { content: string }
) => {
  try {
    const response = await api.put(`/comments/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (id: number) => {
  try {
    await api.delete(`/comments/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// User-related API calls
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await api.put("/users/me", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Example usage in components:
/*
import { 
  login, register, logout, 
  getPosts, createPost, updatePost, deletePost,
  getComments, createComment, updateComment, deleteComment,
  getCurrentUser, updateUser 
} from '@/app/api/api';

// Auth flow
const handleLogin = async (credentials) => {
  try {
    const { token, user } = await login(credentials);
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};

const handleRegister = async (userData) => {
  try {
    const { token, user } = await register(userData);
    // Handle successful registration
  } catch (error) {
    // Handle error
  }
};

const handleLogout = async () => {
  try {
    await logout();
    // Handle successful logout
  } catch (error) {
    // Handle error
  }
};

// Post flow
const handleCreatePost = async (postData) => {
  try {
    const post = await createPost(postData);
    // Handle successful post creation
  } catch (error) {
    // Handle error
  }
};

// Comment flow
const handleCreateComment = async (commentData) => {
  try {
    const comment = await createComment(commentData);
    // Handle successful comment creation
  } catch (error) {
    // Handle error
  }
};

// User flow
const handleUpdateProfile = async (userData) => {
  try {
    const user = await updateUser(userData);
    // Handle successful profile update
  } catch (error) {
    // Handle error
  }
};
*/
