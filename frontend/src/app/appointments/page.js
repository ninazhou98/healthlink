"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
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
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Navigation />
        
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h2 className="text-2xl font-semibold text-slate-800">Your Appointments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-slate-500">Loading appointments...</p>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-sm text-slate-500">
                            {appointment.date} • {appointment.time}
                          </p>
                          <p className="text-sm mt-1">Dr. {appointment.doctor}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                          <Clock className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Schedule New Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">Select an appointment type and preferred date to schedule your next visit.</p>
                <div className="grid gap-3">
                  <Button className="justify-start bg-blue-600 hover:bg-blue-700">
                    Annual Physical Exam
                  </Button>
                  <Button className="justify-start bg-blue-600 hover:bg-blue-700">
                    Follow-up Visit
                  </Button>
                  <Button className="justify-start bg-blue-600 hover:bg-blue-700">
                    Specialist Consultation
                  </Button>
                  <Button className="justify-start bg-blue-600 hover:bg-blue-700">
                    Vaccination
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}