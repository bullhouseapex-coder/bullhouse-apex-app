import { BadgeDollarSign, ChartColumnDecreasing, CircleStar, Home, User, Users } from "lucide-react";
import { Separator } from "./ui/separator";

type SidebarLinkProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
};

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  return (
    <a className="flex items-center px-5 py-4 gap-2 hover:bg-white/20" href={href}>
      {icon}
      {label}
    </a>
  );
}

const Sidebar = () => {
  return (
    <aside className="w-80 fixed border rounded-md">
      <div className="p-5">
        <h2 className="text-xl">Main Menu</h2>
      </div>

      <Separator />

      <nav>
        <SidebarLink href="#" icon={<Home />} label="Accounts Overview"></SidebarLink>
        <SidebarLink href="#" icon={<User />} label="Profile"></SidebarLink>
        <SidebarLink href="#" icon={<Users />} label="Traders"></SidebarLink>
        <SidebarLink href="#" icon={<BadgeDollarSign />} label="Billing"></SidebarLink>
        <SidebarLink href="#" icon={<ChartColumnDecreasing />} label="Leaderboards"></SidebarLink>
        <SidebarLink href="#" icon={<CircleStar />} label="Certificates"></SidebarLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
