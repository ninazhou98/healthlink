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
    <nav className="flex justify-center md:justify-start p-4 bg-white border-b">
      <div className="flex space-x-1 md:space-x-4">
        <Link href="/" className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
          <Home className="w-5 h-5 mr-2" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link href="/appointments" className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/appointments') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
          <Calendar className="w-5 h-5 mr-2" />
          <span className="hidden md:inline">Appointments</span>
        </Link>
        <Link href="/messages" className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/messages') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
          <MessageSquare className="w-5 h-5 mr-2" />
          <span className="hidden md:inline">Messages</span>
        </Link>
        <Link href="/profile" className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
          <User className="w-5 h-5 mr-2" />
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </nav>
  );
}