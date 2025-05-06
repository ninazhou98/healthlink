"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, Clock } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.slice(0, 3)); // Get only the first 3 appointments
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HealthLink Patient Portal</h1>
          <p className="text-gray-600 mt-2">Manage your healthcare communications in one place</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Loading appointments...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : appointments.length > 0 ? (
                <ul className="space-y-3">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="flex items-start gap-3 border-b pb-2 last:border-0">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{appointment.type}</p>
                        <p className="text-xs text-gray-500">{appointment.date}, {appointment.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No upcoming appointments</p>
              )}
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/appointments">View All</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">You have 2 unread messages</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-purple-500" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Update your personal information and preferences</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">Manage Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Need assistance?</h2>
          <p className="mb-4">Our support team is available 24/7 to help you with any questions.</p>
          <Button variant="secondary">Contact Support</Button>
        </section>
      </main>
    </div>
  );
}