"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MessageSquare, User, Home } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="flex justify-center md:justify-start mb-8">
      <div className="flex space-x-1 md:space-x-4 p-1 bg-slate-100 rounded-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive 
                  ? "bg-white text-blue-700 shadow-sm" 
                  : "text-slate-700 hover:bg-slate-200"}`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}