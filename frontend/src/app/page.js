"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setUpcomingAppointments(data.slice(0, 3)); // Show only 3 upcoming appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Use mock data if API fails
        setUpcomingAppointments([
          { id: 1, date: "2023-05-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up" },
          { id: 2, date: "2023-05-22", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Mock messages data
    setUnreadMessages([
      { id: 1, sender: "Dr. Smith", preview: "Your test results are ready", date: "Today" },
      { id: 2, sender: "Reception", preview: "Appointment confirmation", date: "Yesterday" }
    ]);

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        <p className="text-sm text-gray-500">Your healthcare connection</p>
      </header>

      <div className="flex flex-1">
        <Navigation />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <h2 className="text-2xl font-semibold mb-6">Patient Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-gray-500">Loading appointments...</p>
                ) : upcomingAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <li key={appointment.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{appointment.date}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No upcoming appointments</p>
                )}
                <div className="mt-4">
                  <Link href="/appointments">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      View all appointments
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Messages
                </CardTitle>
                <CardDescription>Recent communications</CardDescription>
              </CardHeader>
              <CardContent>
                {unreadMessages.length > 0 ? (
                  <ul className="space-y-3">
                    {unreadMessages.map((message) => (
                      <li key={message.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{message.sender}</p>
                          <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{message.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No unread messages</p>
                )}
                <div className="mt-4">
                  <Link href="/messages">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      View all messages
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/appointments">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Schedule Appointment
                    </Button>
                  </Link>
                  <Link href="/messages">
                    <Button variant="outline" className="w-full">
                      Message Provider
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}