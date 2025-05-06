"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-2 text-gray-600">View and manage your upcoming appointments</p>
          </div>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`w-2 h-full absolute ${getAppointmentStatusColor(appointment.status)}`}></div>
                <CardContent className="p-6 pl-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.type}</h3>
                      <p className="text-gray-500">{appointment.doctor}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                      <div className="flex items-center text-gray-700">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No appointments scheduled</p>
              <Button className="mt-4">Schedule an Appointment</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

function getAppointmentStatusColor(status) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
}