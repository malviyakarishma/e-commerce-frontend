/* eslint-disable @typescript-eslint/no-explicit-any */



export const apiClient = {
  request: async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const url = `${baseURL}${endpoint}`;

    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API Request Failed');
    }

    return response.json();
  },

  get: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, body: any, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: (endpoint: string, body: any, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'DELETE' }),
};
