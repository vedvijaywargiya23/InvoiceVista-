import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon, label, active = false }: SidebarLinkProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-4 py-2 mb-1 text-left",
          active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationLinks = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    { to: "/clients", icon: <Users size={20} />, label: "Clients" },
    { to: "/invoices", icon: <FileText size={20} />, label: "Invoices" },
    { to: "/profile", icon: <UserCircle size={20} />, label: "Profile" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div
      className={cn(
        "w-[250px] h-full bg-background border-r p-4 flex flex-col",
        className,
      )}
    >
      <div className="flex-1">
        <div className="mb-8 px-4">
          <h2 className="text-xl font-bold text-primary">InvoiceVista</h2>
          <p className="text-xs text-muted-foreground">
            Professional Invoicing
          </p>
        </div>

        <nav className="space-y-1">
          {navigationLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={currentPath === link.to}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
