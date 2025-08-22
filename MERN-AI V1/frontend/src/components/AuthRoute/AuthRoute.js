import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import AuthCheckingComponent from "../Alert/AuthCheckingComponent";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const {
    isAuthenticated,
    isLoading,
    isError
  } = useAuth();
  
  // If we're still loading, show the loading component
  if (isLoading) {
    return (
      <div>
        {/* <h1>Checking Auth Status...</h1> */}
        <AuthCheckingComponent />
      </div>
    );
  }
  
  // If there's an error or user is not authenticated, redirect to login
  if (
    isError ||
    isAuthenticated === false
  ) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }
  
  return children;
};

export default AuthRoute;
