"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  MessageSquare, 
  User, 
  Home,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex h-screen w-64 flex-col bg-slate-50 border-r border-slate-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">HealthLink</h2>
          <p className="text-sm text-slate-500">Patient Portal</p>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-blue-600">HealthLink</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b border-slate-200">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}