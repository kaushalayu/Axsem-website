const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async (res) => {
  const data = await res.json().catch(() => null);
  
  if (!res.ok) {
    throw new ApiError(
      data?.message || `Request failed with status ${res.status}`,
      res.status,
      data
    );
  }
  
  return data;
};

const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please check your connection.', 0, null);
  }
};

const fetchFormData = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {},
    });
    return await handleResponse(res);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please check your connection.', 0, null);
  }
};

export const api = {
  // Company Info
  getCompanyInfo: () => fetchWithErrorHandling(`${API_URL}/companyinfo`),
  updateCompanyInfo: (data) => fetchWithErrorHandling(`${API_URL}/companyinfo`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  updateCompanyInfoWithLogo: async (data, logoFile) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append('logo', logoFile);
    return fetchFormData(`${API_URL}/companyinfo`, {
      method: 'PUT',
      body: formData,
    });
  },

  // Services
  getServices: () => fetchWithErrorHandling(`${API_URL}/services`),
  getServiceById: (id) => fetchWithErrorHandling(`${API_URL}/services/${id}`),
  addService: (data) => fetchWithErrorHandling(`${API_URL}/services`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateService: (id, data) => fetchWithErrorHandling(`${API_URL}/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteService: (id) => fetchWithErrorHandling(`${API_URL}/services/${id}`, {
    method: 'DELETE',
  }),

  // Image Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return fetchFormData(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
  },

  // Team
  getTeam: () => fetchWithErrorHandling(`${API_URL}/team`),
  addTeam: async (data, imageFile = null) => {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append('image', imageFile);
      return fetchFormData(`${API_URL}/team`, {
        method: 'POST',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/team`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateTeam: async (id, data, imageFile = null) => {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append('image', imageFile);
      return fetchFormData(`${API_URL}/team/${id}`, {
        method: 'PUT',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteTeam: (id) => fetchWithErrorHandling(`${API_URL}/team/${id}`, {
    method: 'DELETE',
  }),

  // Careers
  getCareers: () => fetchWithErrorHandling(`${API_URL}/careers`),
  addCareer: (data) => fetchWithErrorHandling(`${API_URL}/careers`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  deleteCareer: (id) => fetchWithErrorHandling(`${API_URL}/careers/${id}`, {
    method: 'DELETE',
  }),

  // Contacts
  getContacts: () => fetchWithErrorHandling(`${API_URL}/contacts`),
  addContact: (data) => fetchWithErrorHandling(`${API_URL}/contacts`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  markContactRead: (id) => fetchWithErrorHandling(`${API_URL}/contacts/${id}/read`, {
    method: 'PATCH',
  }),
  deleteContact: (id) => fetchWithErrorHandling(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  }),

  // Blogs
  getBlogs: () => fetchWithErrorHandling(`${API_URL}/blogs`),
  getAllBlogs: () => fetchWithErrorHandling(`${API_URL}/blogs/all`),
  getBlogBySlug: (slug) => fetchWithErrorHandling(`${API_URL}/blogs/${slug}`),
  addBlog: async (data, imageFile = null) => {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      formData.append('image', imageFile);
      return fetchFormData(`${API_URL}/blogs`, {
        method: 'POST',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/blogs`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateBlog: async (id, data, imageFile = null) => {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      formData.append('image', imageFile);
      return fetchFormData(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteBlog: (id) => fetchWithErrorHandling(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
  }),

  // Projects
  getProjects: () => fetchWithErrorHandling(`${API_URL}/projects`),
  getProjectById: (id) => fetchWithErrorHandling(`${API_URL}/projects/${id}`),
  addProject: async (data, galleryFiles = []) => {
    if (galleryFiles && galleryFiles.length > 0) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      galleryFiles.forEach((file) => formData.append('gallery', file));
      return fetchFormData(`${API_URL}/projects`, {
        method: 'POST',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateProject: async (id, data, galleryFiles = []) => {
    if (galleryFiles && galleryFiles.length > 0) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      galleryFiles.forEach((file) => formData.append('gallery', file));
      return fetchFormData(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        body: formData,
      });
    }
    return fetchWithErrorHandling(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteProject: (id) => fetchWithErrorHandling(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
  }),

  // Inquiries
  addInquiry: (data) => fetchWithErrorHandling(`${API_URL}/inquiries`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getInquiries: () => fetchWithErrorHandling(`${API_URL}/inquiries`),
  deleteInquiry: (id) => fetchWithErrorHandling(`${API_URL}/inquiries/${id}`, {
    method: 'DELETE',
  }),

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  getAuthToken: () => localStorage.getItem('adminToken'),

  getAuthUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  verifyToken: async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false };
    return fetchWithErrorHandling(`${API_URL}/auth/verify-token`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  forgotPassword: (email) => fetchWithErrorHandling(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

  verifyOTP: (email, otp) => fetchWithErrorHandling(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  }),

  resetPassword: (email, newPassword) => fetchWithErrorHandling(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ email, newPassword }),
  }),

  // Pricing
  getPricing: () => fetchWithErrorHandling(`${API_URL}/pricing`),
  getPricingByCategory: (category) => fetchWithErrorHandling(`${API_URL}/pricing/${category}`),
  updatePricing: (category, data) => fetchWithErrorHandling(`${API_URL}/pricing/${category}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Product Pricing
  getProductPricing: () => fetchWithErrorHandling(`${API_URL}/product-pricing`),
  getProductPricingById: (productId) => fetchWithErrorHandling(`${API_URL}/product-pricing/${productId}`),
  updateProductPricing: (productId, data) => fetchWithErrorHandling(`${API_URL}/product-pricing/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export { ApiError };
export default api;