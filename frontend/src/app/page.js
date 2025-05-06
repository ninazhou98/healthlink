"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Clock, AlertCircle } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.slice(0, 3)); // Get only 3 upcoming appointments
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Could not load appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pt-4 pb-20 md:pb-8 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HealthLink Portal</h1>
          <p className="text-gray-600 mt-2">Welcome back, Sarah</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your scheduled visits</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Loading appointments...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : appointments.length > 0 ? (
                <ul className="space-y-3">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm border-b pb-2 last:border-0">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No upcoming appointments</p>
              )}
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/appointments">View All</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                Recent Messages
              </CardTitle>
              <CardDescription>Communication with your provider</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm border-b pb-2">
                  <div className="bg-green-100 text-green-700 p-2 rounded-md">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Johnson</p>
                    <p className="text-gray-500">Lab results are ready for review</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-sm">
                  <div className="bg-green-100 text-green-700 p-2 rounded-md">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Nurse Williams</p>
                    <p className="text-gray-500">Prescription refill approved</p>
                  </div>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/messages">View All</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                Health Reminders
              </CardTitle>
              <CardDescription>Important health tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm border-b pb-2">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-md">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Annual Physical</p>
                    <p className="text-gray-500">Due in 2 weeks</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-sm">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-md">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Prescription Refill</p>
                    <p className="text-gray-500">Renew in 5 days</p>
                  </div>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                View All
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}