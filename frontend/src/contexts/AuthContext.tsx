import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

type AuthProviderProp = {
  children: ReactNode;
};

interface AuthUser {
  username: string;
  email: string;
  picture: string;
  userId: string;
}

interface AuthContextProvider {
  authUser: AuthUser | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/auth/check");
      const data = response.data;

      setAuth(data);
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/login", { email, password });
      const data = response.data;

      setAuth(data.data);
      toast.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/signup", { username, email, password });
      const data = response.data;

      setAuth(data.data);
      toast.success("Account Created Successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/google-login", { token });
      const data = response.data;

      setAuth(data.data);
      toast.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/logout");

      setAuth(null);
      toast.success("Logout Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);

      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const values = {
    authUser: auth,
    isLoading,
    checkAuth,
    login,
    signup,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
