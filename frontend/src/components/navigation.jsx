"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MessageSquare, User, Home } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:space-x-8 py-3">
          <Link href="/" className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-md ${isActive('/')}`}>
            <Home size={20} />
            <span className="text-xs md:text-sm">Home</span>
          </Link>
          
          <Link href="/appointments" className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-md ${isActive('/appointments')}`}>
            <Calendar size={20} />
            <span className="text-xs md:text-sm">Appointments</span>
          </Link>
          
          <Link href="/messages" className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-md ${isActive('/messages')}`}>
            <MessageSquare size={20} />
            <span className="text-xs md:text-sm">Messages</span>
          </Link>
          
          <Link href="/profile" className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-md ${isActive('/profile')}`}>
            <User size={20} />
            <span className="text-xs md:text-sm">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}