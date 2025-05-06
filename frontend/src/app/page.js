"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Calendar, MessageSquare, Bell, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.slice(0, 3)); // Get only 3 most recent
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-700">HealthLink</h1>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Navigation />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Patient Dashboard</h2>
          <p className="text-slate-600 mb-6">
            Welcome to your healthcare portal. Manage appointments, communicate with your healthcare providers, and access your medical information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your scheduled visits</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-slate-500">Loading appointments...</p>
              ) : appointments.length > 0 ? (
                <ul className="space-y-3">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm border-b pb-2 last:border-0">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-slate-500">{appointment.date}, {appointment.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">No upcoming appointments</p>
              )}
              <Button variant="link" className="mt-2 p-0" asChild>
                <Link href="/appointments">View all appointments</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Recent Messages
              </CardTitle>
              <CardDescription>Communications from your providers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm border-b pb-2">
                  <div className="bg-green-100 text-green-700 p-2 rounded-md">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Lab Results Available</p>
                    <p className="text-slate-500">Dr. Smith - 2 days ago</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-sm">
                  <div className="bg-green-100 text-green-700 p-2 rounded-md">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Prescription Refill</p>
                    <p className="text-slate-500">Dr. Johnson - 5 days ago</p>
                  </div>
                </li>
              </ul>
              <Button variant="link" className="mt-2 p-0" asChild>
                <Link href="/messages">View all messages</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                My Health Profile
              </CardTitle>
              <CardDescription>Your personal health information</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Next checkup:</span>
                  <span>June 15, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Last visit:</span>
                  <span>March 10, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Allergies:</span>
                  <span>Penicillin</span>
                </li>
              </ul>
              <Button variant="link" className="mt-2 p-0" asChild>
                <Link href="/profile">View full profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}