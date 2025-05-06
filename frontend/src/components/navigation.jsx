"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MessageSquare, User, Home } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:relative md:border-t-0 md:border-r md:h-screen md:w-64 md:py-6">
      <div className="flex justify-around md:flex-col md:items-start md:space-y-6 md:px-4">
        <Link href="/" className={`flex flex-col items-center md:flex-row md:space-x-2 p-2 rounded-md ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs md:text-sm">Dashboard</span>
        </Link>
        
        <Link href="/appointments" className={`flex flex-col items-center md:flex-row md:space-x-2 p-2 rounded-md ${isActive('/appointments') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <Calendar className="h-5 w-5" />
          <span className="text-xs md:text-sm">Appointments</span>
        </Link>
        
        <Link href="/messages" className={`flex flex-col items-center md:flex-row md:space-x-2 p-2 rounded-md ${isActive('/messages') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs md:text-sm">Messages</span>
        </Link>
        
        <Link href="/profile" className={`flex flex-col items-center md:flex-row md:space-x-2 p-2 rounded-md ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <User className="h-5 w-5" />
          <span className="text-xs md:text-sm">Profile</span>
        </Link>
      </div>
    </nav>
  );
}