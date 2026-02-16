import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/lib/axiosInstance";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600 mt-2">Sign in to your account or create a new one</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                activeTab === "login" ? "border-b-2 border-orange-400 text-orange-400" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                activeTab === "register" ? "border-b-2 border-orange-400 text-orange-400" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default LoginPage;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, googleLogin } = useAuth();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    // Send token to your backend for verification
    try {
      const token = credentialResponse.credential;

      if (!token) return;

      googleLogin(token);

      // Store the JWT token from your backend
      // localStorage.setItem("authToken", data.token);

      // Redirect or update UI
      console.log("Login successful:", authUser);
    } catch (error) {
      console.error("Backend authentication failed:", error);
    }
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axiosInstance.get("/auth/test-cookie");

    const data = response.data;
    console.log(data);
    // Add your login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="login-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors font-medium"
      >
        Sign In
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </form>
  );
}

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { authUser, googleLogin } = useAuth();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    // Send token to your backend for verification
    try {
      const token = credentialResponse.credential;

      if (!token) return;

      googleLogin(token);

      // Store the JWT token from your backend
      // localStorage.setItem("authToken", data.token);

      // Redirect or update UI
      console.log("Login successful:", authUser);
    } catch (error) {
      console.error("Backend authentication failed:", error);
    }
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Register:", { name, email, password });
    // Add your registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="register-name" className="text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="register-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          minLength={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label htmlFor="register-confirm-password" className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          minLength={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors font-medium"
      >
        Create Account
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </form>
  );
}
