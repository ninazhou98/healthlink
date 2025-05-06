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

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />
    },
    {
      href: "/appointments",
      label: "Appointments",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      href: "/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />
    }
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center p-4 border-b">
        <Link href="/" className="font-bold text-xl text-blue-600">HealthLink</Link>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {routes.map((route) => (
              <Link 
                key={route.href} 
                href={route.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-100 ${
                  pathname === route.href ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col h-full w-64 border-r bg-white p-4">
        <Link href="/" className="font-bold text-2xl text-blue-600 mb-8">HealthLink</Link>
        <nav className="flex flex-col gap-2">
          {routes.map((route) => (
            <Link 
              key={route.href} 
              href={route.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-100 ${
                pathname === route.href ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600"
              }`}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}