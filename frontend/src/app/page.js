"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const appointmentsResponse = await axios.get('/api/appointments');
        setUpcomingAppointments(appointmentsResponse.data.slice(0, 2));
        setUnreadMessages(3); // Mock data for unread messages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your HealthLink patient portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold">Upcoming Appointments</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/appointments" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View all appointments
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>

          {/* Messages Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold">Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <p className="font-medium">You have {unreadMessages} unread messages</p>
                    <p className="text-sm text-gray-500">Check your inbox for updates from your healthcare provider</p>
                  </div>
                  <Link href="/messages">
                    <Button className="w-full">View Messages</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
              <User className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="font-medium">Keep your information up to date</p>
                <p className="text-sm text-gray-500">Ensure your contact details and medical information are current</p>
              </div>
              <Link href="/profile">
                <Button variant="outline" className="w-full">Manage Profile</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}