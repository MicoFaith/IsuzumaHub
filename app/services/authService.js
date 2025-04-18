import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // Add this to your axios configuration
  setupAxiosInterceptors: (token) => {
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

export default authService;