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
    <nav className="flex justify-center md:justify-start mb-8">
      <div className="flex space-x-1 md:space-x-4 p-1 bg-slate-100 rounded-lg">
        <Link href="/" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-700 hover:bg-white/60'}`}>
          <Home className="h-4 w-4 mr-2" />
          <span>Dashboard</span>
        </Link>
        
        <Link href="/appointments" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/appointments') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-700 hover:bg-white/60'}`}>
          <Calendar className="h-4 w-4 mr-2" />
          <span>Appointments</span>
        </Link>
        
        <Link href="/messages" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/messages') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-700 hover:bg-white/60'}`}>
          <MessageSquare className="h-4 w-4 mr-2" />
          <span>Messages</span>
        </Link>
        
        <Link href="/profile" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/profile') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-700 hover:bg-white/60'}`}>
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}