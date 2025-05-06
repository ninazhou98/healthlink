"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        // Only show the next 3 appointments
        setAppointments(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Welcome to HealthLink</h1>
            <p className="text-slate-500 mt-2">Your healthcare communication portal</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ) : appointments.length > 0 ? (
                  <ul className="space-y-3">
                    {appointments.map((appointment, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-slate-50">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-slate-500">{appointment.date} at {appointment.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-4 text-slate-500">No upcoming appointments</p>
                )}
                <div className="mt-4">
                  <Link href="/appointments">
                    <Button variant="outline" className="w-full">View All Appointments</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Messages
                </CardTitle>
                <CardDescription>Communicate with your healthcare provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-md bg-slate-50">
                    <p className="font-medium">Have questions about your treatment?</p>
                    <p className="text-sm text-slate-500">Send a secure message to your doctor</p>
                  </div>
                  <div className="p-3 rounded-md bg-slate-50">
                    <p className="font-medium">Need prescription refills?</p>
                    <p className="text-sm text-slate-500">Request medication refills through messaging</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/messages">
                    <Button variant="outline" className="w-full">Go to Messages</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Your Profile
                </CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-md bg-slate-50">
                    <p className="font-medium">Update contact information</p>
                    <p className="text-sm text-slate-500">Keep your details current for better care</p>
                  </div>
                  <div className="p-3 rounded-md bg-slate-50">
                    <p className="font-medium">Health records access</p>
                    <p className="text-sm text-slate-500">View your medical history and test results</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}