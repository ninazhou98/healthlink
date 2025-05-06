"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, ArrowRight, Bell } from "lucide-react";
import Navigation from "@/components/navigation";

export default function Home() {
  const [notifications] = useState([
    { id: 1, title: "Appointment Reminder", message: "You have an appointment with Dr. Smith tomorrow at 10:00 AM", date: "Today" },
    { id: 2, title: "Lab Results", message: "Your recent lab results are now available", date: "Yesterday" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
            <div className="relative">
              <Bell className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 mb-16 md:mb-0">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, Sarah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Next: Dr. Smith - May 15, 10:00 AM</p>
              </CardContent>
              <CardFooter>
                <Link href="/appointments" className="text-blue-600 text-sm flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">2 unread messages</p>
              </CardContent>
              <CardFooter>
                <Link href="/messages" className="text-blue-600 text-sm flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  My Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Update your personal information</p>
              </CardContent>
              <CardFooter>
                <Link href="/profile" className="text-blue-600 text-sm flex items-center">
                  View profile <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">{notification.title}</CardTitle>
                  <CardDescription>{notification.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Navigation />
    </div>
  );
}