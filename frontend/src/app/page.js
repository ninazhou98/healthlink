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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">HealthLink</h1>
          <p className="text-sm text-gray-500">Patient Communication Portal</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome Back, John</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading appointments...</p>
                  ) : error ? (
                    <p className="text-sm text-red-500">{error}</p>
                  ) : appointments.length > 0 ? (
                    <ul className="space-y-2">
                      {appointments.map((appointment, index) => (
                        <li key={index} className="text-sm p-2 border-b last:border-0">
                          <div className="font-medium">{appointment.type}</div>
                          <div className="text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {appointment.date}, {appointment.time}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No upcoming appointments</p>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/appointments" className="w-full">
                    <Button variant="outline" className="w-full text-blue-600">View All</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm p-2 border-b">
                      <div className="font-medium">Dr. Smith</div>
                      <div className="text-gray-500 truncate">Your test results are ready...</div>
                    </li>
                    <li className="text-sm p-2 border-b">
                      <div className="font-medium">Nurse Johnson</div>
                      <div className="text-gray-500 truncate">Reminder about your medication...</div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/messages" className="w-full">
                    <Button variant="outline" className="w-full text-blue-600">View All</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Health Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm p-2 border-b">
                      <div className="font-medium">Annual Physical</div>
                      <div className="text-gray-500">Due in 2 weeks</div>
                    </li>
                    <li className="text-sm p-2 border-b">
                      <div className="font-medium">Prescription Refill</div>
                      <div className="text-gray-500">Renew by 05/15</div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full text-blue-600">Manage Reminders</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/appointments" className="w-full">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Schedule Appointment</span>
                </Button>
              </Link>
              <Link href="/messages" className="w-full">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span>Message Provider</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Records</span>
              </Button>
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Pay Bill</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}