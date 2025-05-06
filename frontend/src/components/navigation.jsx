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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:relative md:border-t-0 md:border-r md:h-screen md:w-64 md:py-6">
      <div className="flex justify-around md:flex-col md:items-start md:space-y-6 md:px-4">
        <Link href="/" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Home size={20} />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        
        <Link href="/appointments" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/appointments') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Calendar size={20} />
          <span className="hidden md:inline">Appointments</span>
        </Link>
        
        <Link href="/messages" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/messages') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
          <MessageSquare size={20} />
          <span className="hidden md:inline">Messages</span>
        </Link>
        
        <Link href="/profile" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
          <User size={20} />
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </nav>
  );
}