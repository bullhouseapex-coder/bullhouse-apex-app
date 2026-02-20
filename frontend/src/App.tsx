import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { Spinner } from "./components/ui/spinner";
import SignupPage from "./pages/SignupPage";

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
        <Route path="/" element={authUser ? <Dashboard /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
