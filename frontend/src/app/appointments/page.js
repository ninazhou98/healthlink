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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
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
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">View and manage your upcoming appointments</p>
        </header>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <Button>Schedule New</Button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appointment, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-2 ${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{appointment.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                    <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Appointments</h3>
            <p className="text-gray-500 mb-4">You don't have any upcoming appointments</p>
            <Button>Schedule an Appointment</Button>
          </div>
        )}
      </main>
    </div>
  );
}