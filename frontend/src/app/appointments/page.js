"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
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
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your healthcare visits</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule New
          </Button>
        </header>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading appointments...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-md mr-4">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-gray-500 text-sm">Dr. {appointment.doctor}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                        <div className="text-sm">
                          <p className="font-medium">{appointment.date}</p>
                          <p className="text-gray-500">{appointment.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Details <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}