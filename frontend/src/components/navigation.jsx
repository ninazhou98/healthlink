"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  MessageSquare, 
  User, 
  Home 
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="flex justify-center md:justify-start space-x-4 py-4 px-6 bg-white shadow-sm">
      <Link href="/" className={`flex items-center space-x-2 ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`}>
        <Home size={20} />
        <span className="hidden md:inline">Dashboard</span>
      </Link>
      <Link href="/appointments" className={`flex items-center space-x-2 ${isActive('/appointments') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`}>
        <Calendar size={20} />
        <span className="hidden md:inline">Appointments</span>
      </Link>
      <Link href="/messages" className={`flex items-center space-x-2 ${isActive('/messages') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`}>
        <MessageSquare size={20} />
        <span className="hidden md:inline">Messages</span>
      </Link>
      <Link href="/profile" className={`flex items-center space-x-2 ${isActive('/profile') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`}>
        <User size={20} />
        <span className="hidden md:inline">Profile</span>
      </Link>
    </nav>
  );
}