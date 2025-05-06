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
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/appointments');
        // Filter to show only upcoming appointments (next 3)
        const upcoming = response.data.slice(0, 3);
        setUpcomingAppointments(upcoming);
        setUnreadMessages(4); // Mock data for unread messages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to HealthLink</h1>
            <p className="mt-2 text-lg text-gray-600">Your secure patient communication portal</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-4">Loading appointments...</p>
                ) : upcomingAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {upcomingAppointments.map((appointment, index) => (
                      <li key={index} className="flex items-start p-3 border rounded-md">
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <Clock className="h-5 w-5 text-blue-600" />
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
                  <p className="text-center py-4">No upcoming appointments</p>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/appointments" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Appointments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Messages Card */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Your secure communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-3">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium">You have {unreadMessages} unread messages</h3>
                  <p className="text-sm text-gray-500 mt-1">Stay in touch with your healthcare team</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/messages" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Messages
                    <ArrowRight className="ml-2 h-4 w-4" />
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