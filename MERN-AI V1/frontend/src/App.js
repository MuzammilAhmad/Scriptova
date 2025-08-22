import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Registration from "./components/Users/Register";
import Login from "./components/Users/Login";
import Dashboard from "./components/Users/Dashboard";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import BlogPostAIAssistant from "./components/ContentGeneration/ContentGeneration";
import Plans from "./components/Plans/Plan";
import FreePlanSignup from "./components/StripePayment/FreePlanSignup";
import CheckoutForm from "./components/StripePayment/CheckoutForm";
import PaymentSuccess from "./components/StripePayment/PaymentSucess";
import ContentGenerationHistory from "./components/ContentGeneration/ContentGenerationHistory";
import AppFeatures from "./components/Features/Features";
import AboutUs from "./components/About/About";
import CodeAIAssistant from "./components/CodeGeneration/CodeGeneration";
import CodeGenerationHistory from "./components/CodeGeneration/CodeGenerationHistory";

export default function App() {
  // custom auth hook
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? (
          <PrivateNavbar />
        ) : (
          <PublicNavbar />
        )}
        {/* Define routes for the application */}
        <Routes>
          <Route
            path="/register"
            element={<Registration />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/generate-content"
            element={
              <AuthRoute>
                <BlogPostAIAssistant />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <ContentGenerationHistory />
              </AuthRoute>
            }
          />
          <Route
            path="/generate-code"
            element={
              <AuthRoute>
                <CodeAIAssistant />
              </AuthRoute>
            }
          />
          <Route
            path="/history-code"
            element={
              <AuthRoute>
                <CodeGenerationHistory />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/plans"
            element={<Plans />}
          />
          <Route
            path="/free-plan"
            element={
              <AuthRoute>
                <FreePlanSignup />
              </AuthRoute>
            }
          />
          <Route
            path="/checkout/:plan"
            element={
              <AuthRoute>
                <CheckoutForm />
              </AuthRoute>
            }
          />
          <Route
            path="/success"
            element={
              <AuthRoute>
                <PaymentSuccess />
              </AuthRoute>
            }
          />
          <Route
            path="/features"
            element={<AppFeatures />}
          />
          <Route
            path="/about"
            element={<AboutUs />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
