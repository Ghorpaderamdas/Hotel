// Authentication API utilities for backend integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

class AuthAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      if (response.status === 0) {
        throw new Error('Unable to connect to server. Please ensure the backend is running on http://localhost:8080');
      }
      
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If we can't parse the error response, use the default message
      }
      
      throw new Error(errorMessage);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Invalid response from server');
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        // Add timeout and other fetch options for better error handling
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      const data = await this.handleResponse<LoginResponse>(response);
      
      if (data.success && data.data?.token) {
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data));
      }

      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running on http://localhost:8080');
      }
      
      if (error.name === 'TimeoutError') {
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('isAdminLoggedIn');
    }
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(10000),
      });

      return await this.handleResponse<string>(response);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      
      throw error;
    }
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(10000),
      });

      return await this.handleResponse<string>(response);
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      
      throw error;
    }
  }

  async validateResetToken(token: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate-reset-token?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });

      return await this.handleResponse<boolean>(response);
    } catch (error: any) {
      console.error('Token validation error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      
      throw error;
    }
  }

  async getDashboard(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(10000),
      });

      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }

      return await this.handleResponse<any>(response);
    } catch (error: any) {
      console.error('Dashboard error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      
      throw error;
    }
  }

  async getProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(10000),
      });

      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }

      return await this.handleResponse<any>(response);
    } catch (error: any) {
      console.error('Profile error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      
      throw error;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getStoredUser(): LoginResponse | null {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Method to check if backend is accessible - Fixed health check endpoint
  async checkBackendHealth(): Promise<boolean> {
    try {
      // Try multiple endpoints to check if backend is running
      const endpoints = [
        `${API_BASE_URL}/auth/login`, // Try the login endpoint with OPTIONS
        `http://localhost:8080/api/auth/login`, // Direct URL
        `http://localhost:8080` // Root endpoint
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'OPTIONS', // Use OPTIONS to avoid CORS issues
            signal: AbortSignal.timeout(3000),
          });
          if (response.status < 500) { // Any response except server error means backend is running
            return true;
          }
        } catch (error) {
          // Try next endpoint
          continue;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }
}

export const authApi = new AuthAPI();