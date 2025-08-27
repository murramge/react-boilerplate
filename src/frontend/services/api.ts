const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface ApiResponse<T = any> {
  data: T;
  total?: number;
}

interface ApiError {
  error: {
    message: string;
    status: number;
    timestamp: string;
    path: string;
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);

// Health check function
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const healthUrl = import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/health`
      : "/health";
    const response = await fetch(healthUrl);
    return response.ok;
  } catch {
    return false;
  }
};
