import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { authUser, logout } = useAuth();
  return (
    <div>
      <header className="sticky top-0 w-full flex justify-center border-b backdrop-blur">
        <div className="container">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-3xl font-extrabold">BHA</h1>
            <div className="ml-auto flex items-center gap-3">
              <h3 className="font-medium">{authUser?.name || "Username"}</h3>
              <Avatar>
                <AvatarImage src={authUser?.picture} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </div>
            <Button className="ml-2" size={"sm"} onClick={logout}>
              <LogOut />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="container">
          <div className="flex mt-8">
            <Sidebar />

            <main className="ml-90 p-3 flex-1 space-y-3">
              <h4>Active Accounts</h4>
              <div className="w-full h-48 border rounded"></div>
              <div className="w-full h-20 border rounded"></div>
              <div className="w-full h-60 border rounded"></div>
              <div className="w-full h-60 border rounded"></div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
