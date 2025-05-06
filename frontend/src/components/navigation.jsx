"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarIcon, MessageSquareIcon, UserIcon, HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "Messages", href: "/messages", icon: MessageSquareIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
  ]
  
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}