// Use environment variable if set, otherwise use relative path (works with Vite proxy in dev)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (response.ok) {
        return { success: true };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        username: userData.name || userData.username,
        password: userData.password,
        role: 'user', // Default role
      }),
    });
  },

  login: async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store tokens
    if (response.access_token && response.refresh_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.access_token && response.refresh_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    }

    return response;
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// Posts API
export const postsAPI = {
  getAll: async (limit = 10, offset = 0) => {
    return apiRequest(`/posts?limit=${limit}&offset=${offset}`);
  },

  getById: async (id) => {
    return apiRequest(`/posts/${id}`);
  },

  getByAuthor: async (authorId, limit = 10, offset = 0) => {
    return apiRequest(`/posts/by-author?author_id=${authorId}&limit=${limit}&offset=${offset}`);
  },

  create: async (postData) => {
    return apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  update: async (id, postData) => {
    return apiRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Events API
export const eventsAPI = {
  getAll: async (limit = 10, offset = 0) => {
    return apiRequest(`/events?limit=${limit}&offset=${offset}`);
  },

  getById: async (id) => {
    return apiRequest(`/events/${id}`);
  },

  getByAuthor: async (authorId, limit = 10, offset = 0) => {
    return apiRequest(`/events/by-author?author_id=${authorId}&limit=${limit}&offset=${offset}`);
  },

  create: async (eventData) => {
    return apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: async (id, eventData) => {
    return apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/events/${id}`, {
      method: 'DELETE',
    });
  },
};

// Comments API
export const commentsAPI = {
  getById: async (id) => {
    return apiRequest(`/comments/${id}`);
  },

  getByPost: async (postId) => {
    return apiRequest(`/comments/by-post?post_id=${postId}`);
  },

  getByAuthor: async (authorId) => {
    return apiRequest(`/comments/by-author?author_id=${authorId}`);
  },

  create: async (commentData) => {
    return apiRequest('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },

  update: async (id, commentData) => {
    return apiRequest(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(commentData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/comments/${id}`, {
      method: 'DELETE',
    });
  },
};

