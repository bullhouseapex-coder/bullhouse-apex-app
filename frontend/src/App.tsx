import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { Spinner } from "./components/ui/spinner";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-20" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster></Toaster>
    </div>
  );
}

export default App;
