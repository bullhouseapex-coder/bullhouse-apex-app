import { axiosInstance } from "@/lib/axiosInstance";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthProviderProp = {
  children: ReactNode;
};

interface AuthUser {
  name: string;
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be within a AuthProvider");
  }

  return context;
};

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
      console.error("Auth Check Failed:", error);
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
    } catch (error) {
      console.error("Login Failed:", error);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/login", { name, email, password });
      const data = response.data;
      setAuth(data.data);
    } catch (error) {
      console.error("Login Failed:", error);
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
    } catch (error) {
      console.error("Login Failed:", error);
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
    } catch (error) {
      console.error("Login Failed:", error);
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
