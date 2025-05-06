"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Calendar, MessageSquare, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">HealthLink</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link href="/appointments" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </Link>
            <Link href="/messages" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Link>
            <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Main menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link href="/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </Link>
            <Link href="/messages" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Link>
            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}