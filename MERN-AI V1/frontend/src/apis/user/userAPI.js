import api from '../axiosConfig';

//--Registration--//
export const registerAPI = async (userData) => {
  const response = await api.post(
    "/users/register",
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    }
  );
  return response?.data;
};

//--Login--//
export const loginAPI = async (userData) => {
  const response = await api.post(
    "/users/login",
    //Payload for login
    {
      email: userData?.email,
      password: userData?.password,
    }
  );
  // Store token in localStorage for persistence
  if (response?.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response?.data;
};

//--Check Auth--//
export const checkUserAuthStatusAPI = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    const response = await api.get(
      "/users/auth/check",
      {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Cache-Control': 'no-cache',
        }
      }
    );
    return response?.data;
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    throw error;
  }
};

//--Logout --//
export const logoutAPI = async () => {
  const response = await api.post("/users/logout", {});
  // Clear token on logout
  localStorage.removeItem('token');
  return response?.data;
};

export const getUserProfileAPI = async () => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  const response = await api.get(
    "/users/profile",
    {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    }
  );
  return response?.data;
};
