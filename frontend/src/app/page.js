"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Bell, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        // Filter to show only upcoming appointments
        const upcoming = response.data.slice(0, 2);
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Patient Dashboard</h1>
            <p className="text-slate-500 mt-2">Welcome back, Sarah</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Calendar className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-md bg-slate-50">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-slate-500">{appointment.date} at {appointment.time}</p>
                          <p className="text-sm text-slate-500">Dr. {appointment.doctor}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2" asChild>
                      <a href="/appointments">View All Appointments</a>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-500">No upcoming appointments</p>
                    <Button className="mt-4" asChild>
                      <a href="/appointments">Schedule Appointment</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Messages</CardTitle>
                  <CardDescription>Recent communications</CardDescription>
                </div>
                <div className="relative">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 rounded-md bg-blue-50">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Lab Results Available</p>
                      <p className="text-sm text-slate-500">Your recent blood work results are ready to view</p>
                      <p className="text-xs text-slate-400 mt-1">Today, 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-md bg-slate-50">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Appointment Reminder</p>
                      <p className="text-sm text-slate-500">Don't forget your appointment tomorrow at 2:00 PM</p>
                      <p className="text-xs text-slate-400 mt-1">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <a href="/messages">View All Messages</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Health Summary</CardTitle>
                <CardDescription>Your recent health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Blood Pressure</p>
                    <p className="text-2xl font-bold">120/80</p>
                    <p className="text-xs text-green-600">Normal range</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Heart Rate</p>
                    <p className="text-2xl font-bold">72 bpm</p>
                    <p className="text-xs text-green-600">Normal range</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Weight</p>
                    <p className="text-2xl font-bold">165 lbs</p>
                    <p className="text-xs text-slate-400">Last updated: 2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}