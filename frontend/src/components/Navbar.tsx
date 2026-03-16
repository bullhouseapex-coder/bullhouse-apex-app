import { useAuth } from "@/contexts/AuthContext";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import logo from "../assets/BH-logo.png";

const Navbar = () => {
  const { authUser, logout } = useAuth();

  console.log(authUser);

  return (
    <header className="fixed bg-slate-900 top-0 w-full flex justify-center backdrop-blur shadow-sm">
      <div className="container">
        <div className="flex items-center px-4 py-2">
          {/* Logo */}
          <div className="flex gap-2 cursor-pointer">
            <div className="w-16 sm:w-20 drop-shadow-xs drop-shadow-black rounded p-1 dark:bg-transparent">
              <img src={logo} className="w-full" alt="logo" />
            </div>
            <div className="shrink-0 flex flex-col items-center justify-center leading-none">
              <div className="flex items-center gap-2">
                <a href="/" className="text-slate-300 font-bold text-md sm:text-2xl tracking-tight ">
                  BULL HOUSE
                </a>
              </div>
              <div className="flex w-full text-center items-center gap-2">
                <div className="grow h-0.5 bg-slate-400"></div>
                <span className="text-[0.65rem] tracking-[0.35em] text-amber-500 font-bold uppercase">APEX</span>
                <div className="grow h-0.5 bg-slate-400"></div>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <h3 className="font-medium text-white">{authUser?.username || "Username"}</h3>
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
  );
};

export default Navbar;
