"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">HealthLink</h1>
          <p className="text-slate-600">Your patient communication portal</p>
        </header>
        
        <Navigation />
        
        <Card>
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-xl text-blue-700">Appointments</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">Loading appointments...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8 text-red-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-start mb-4 md:mb-0">
                          <div className="bg-blue-100 p-3 rounded-md mr-4">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{appointment.type}</h3>
                            <p className="text-slate-500">{appointment.date} at {appointment.time}</p>
                            <p className="text-slate-500">Dr. {appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No upcoming appointments</p>
                    <Button className="mt-4">Schedule New Appointment</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                <div className="text-center py-8">
                  <p className="text-slate-500">No past appointments</p>
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">Loading appointments...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8 text-red-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-start mb-4 md:mb-0">
                          <div className="bg-blue-100 p-3 rounded-md mr-4">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{appointment.type}</h3>
                            <p className="text-slate-500">{appointment.date} at {appointment.time}</p>
                            <p className="text-slate-500">Dr. {appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No appointments found</p>
                    <Button className="mt-4">Schedule New Appointment</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}