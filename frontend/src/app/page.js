"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Calendar, MessageSquare, Bell, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Mock data for the dashboard
  const upcomingAppointments = [
    { id: 1, date: "May 15, 2023", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up" },
    { id: 2, date: "May 22, 2023", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up" }
  ];
  
  const recentMessages = [
    { id: 1, from: "Dr. Smith", preview: "Your test results are ready...", time: "2 hours ago" },
    { id: 2, from: "Nurse Williams", preview: "Reminder about your medication...", time: "Yesterday" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r border-gray-200">
          <Navigation />
        </aside>
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Sarah</h2>
            <p className="text-gray-600">Here's what's happening with your health</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/appointments">
                  <Button variant="outline" className="w-full mt-2">View All Appointments</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentMessages.map(message => (
                  <div key={message.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{message.from}</p>
                        <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/messages">
                  <Button variant="outline" className="w-full mt-2">View All Messages</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-flex mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-1">Schedule Appointment</h3>
                  <p className="text-sm text-gray-500 mb-4">Book your next visit</p>
                  <Link href="/appointments">
                    <Button variant="default" size="sm">Schedule Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-3 inline-flex mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-1">Message Provider</h3>
                  <p className="text-sm text-gray-500 mb-4">Contact your healthcare team</p>
                  <Link href="/messages">
                    <Button variant="default" size="sm">Send Message</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-3 inline-flex mb-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-1">Update Profile</h3>
                  <p className="text-sm text-gray-500 mb-4">Manage your information</p>
                  <Link href="/profile">
                    <Button variant="default" size="sm">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}