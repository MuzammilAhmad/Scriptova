import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { checkUserAuthStatusAPI } from "../apis/user/userAPI";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage token
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  // Make request using react query
  const {
    isError,
    isLoading,
    data,
    isSuccess,
  } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkUserAuthStatusAPI,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Update the authenticated user
  useEffect(() => {
    if (isSuccess) {
      const authStatus = data?.isAuthenticated === true;
      setIsAuthenticated(authStatus);
    } else if (isError) {
      setIsAuthenticated(false);
    }
  }, [data, isSuccess, isError]);

  // Update the user auth after login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Update the user auth after logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isError,
        isLoading,
        data,
        isSuccess,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
