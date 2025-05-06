"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch upcoming appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        // Show only upcoming appointments (first 3)
        setUpcomingAppointments(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    // Simulate unread messages count
    setUnreadMessages(2);
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">HealthLink</h1>
          <p className="text-gray-500 mt-1">Your patient communication portal</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-700">
                  <Calendar className="mr-2" size={20} />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {loading ? (
                  <p className="text-gray-500">Loading appointments...</p>
                ) : upcomingAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {upcomingAppointments.map((appointment, index) => (
                      <li key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Clock size={16} className="text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          <p className="text-sm text-gray-500">Dr. {appointment.doctor}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No upcoming appointments</p>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Link href="/appointments" className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    View all appointments
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Messages Card */}
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-700">
                  <MessageSquare className="mr-2" size={20} />
                  Messages
                </CardTitle>
                <CardDescription>Communicate with your care team</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Unread messages</p>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {unreadMessages}
                  </span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Stay connected with your healthcare providers through secure messaging.</p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Link href="/messages" className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    Go to messages
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-purple-700">
                  <User className="mr-2" size={20} />
                  Your Profile
                </CardTitle>
                <CardDescription>Manage your information</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Personal Information</p>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Complete
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Insurance Details</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Update needed
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Link href="/profile" className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    View profile
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}