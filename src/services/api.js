// API Service for backend calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

// Auth Service
export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Onboarding Service
export const onboardingService = {
  getOnboardingData: async () => {
    const response = await fetch(`${API_BASE_URL}/onboarding/data`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/onboarding/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  updateOrganization: async (organizationData) => {
    const response = await fetch(`${API_BASE_URL}/onboarding/organization`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(organizationData),
    });
    return handleResponse(response);
  },

  updateIntegrations: async (integrationsData) => {
    const response = await fetch(`${API_BASE_URL}/onboarding/integrations`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(integrationsData),
    });
    return handleResponse(response);
  },

  updatePreferences: async (preferencesData) => {
    const response = await fetch(`${API_BASE_URL}/onboarding/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(preferencesData),
    });
    return handleResponse(response);
  },

  completeOnboarding: async () => {
    const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// User Service
export const userService = {
  updateProfile: async (userId, profileData) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  updatePreferences: async (userId, preferences) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(preferences),
    });
    return handleResponse(response);
  },
};