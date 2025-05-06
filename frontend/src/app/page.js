"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Clock, AlertCircle } from "lucide-react";
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
        setError("Could not load appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">HealthLink</h1>
          <p className="text-slate-600">Your patient communication portal</p>
        </header>
        
        <Navigation />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-blue-700">Upcoming Appointments</CardTitle>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <p className="text-center py-4 text-slate-500">Loading appointments...</p>
              ) : error ? (
                <div className="flex items-center justify-center py-4 text-red-500">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>{error}</span>
                </div>
              ) : appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="flex items-start p-3 rounded-lg bg-white border border-slate-200">
                      <div className="bg-blue-100 p-2 rounded-md mr-3">
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
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <Link href="/appointments" className="w-full">
                <Button variant="outline" className="w-full">View All Appointments</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-green-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-green-700">Recent Messages</CardTitle>
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start p-3 rounded-lg bg-white border border-slate-200">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-slate-500">Your lab results are ready for review</p>
                  </div>
                </li>
                <li className="flex items-start p-3 rounded-lg bg-white border border-slate-200">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Appointment Reminder</p>
                    <p className="text-sm text-slate-500">Your appointment is scheduled for tomorrow</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <Link href="/messages" className="w-full">
                <Button variant="outline" className="w-full">View All Messages</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-purple-50 border-b">
            <CardTitle className="text-lg text-purple-700">Health Tips</CardTitle>
            <CardDescription className="text-purple-500">Stay healthy with these tips</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <h3 className="font-medium mb-2">Stay Hydrated</h3>
                <p className="text-sm text-slate-600">Drink at least 8 glasses of water daily to maintain good health.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <h3 className="font-medium mb-2">Regular Exercise</h3>
                <p className="text-sm text-slate-600">Aim for at least 30 minutes of moderate activity each day.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <h3 className="font-medium mb-2">Balanced Diet</h3>
                <p className="text-sm text-slate-600">Include fruits, vegetables, and whole grains in your daily meals.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}