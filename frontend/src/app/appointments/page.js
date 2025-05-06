"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus } from "lucide-react";
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

  const upcomingAppointments = appointments.filter(
    appointment => new Date(appointment.date) >= new Date()
  );
  
  const pastAppointments = appointments.filter(
    appointment => new Date(appointment.date) < new Date()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your healthcare visits</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Appointments</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Schedule New
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Loading appointments...</p>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingAppointments.map((appointment, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-blue-50 pb-3">
                        <CardTitle className="text-lg font-medium text-blue-700">
                          {appointment.type}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Calendar size={18} className="text-gray-500 mr-2" />
                            <span className="text-gray-700">{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={18} className="text-gray-500 mr-2" />
                            <span className="text-gray-700">{appointment.time}</span>
                          </div>
                          <div className="pt-2">
                            <p className="text-sm text-gray-500">With Dr. {appointment.doctor}</p>
                            <p className="text-sm text-gray-500">{appointment.location}</p>
                          </div>
                          <div className="pt-2 flex space-x-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded-lg bg-white">
                  <p className="text-gray-500">No upcoming appointments</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    Schedule New Appointment
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {loading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Loading appointments...</p>
                </div>
              ) : pastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastAppointments.map((appointment, index) => (
                    <Card key={index} className="overflow-hidden opacity-75">
                      <CardHeader className="bg-gray-50 pb-3">
                        <CardTitle className="text-lg font-medium text-gray-700">
                          {appointment.type}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Calendar size={18} className="text-gray-500 mr-2" />
                            <span className="text-gray-700">{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={18} className="text-gray-500 mr-2" />
                            <span className="text-gray-700">{appointment.time}</span>
                          </div>
                          <div className="pt-2">
                            <p className="text-sm text-gray-500">With Dr. {appointment.doctor}</p>
                            <p className="text-sm text-gray-500">{appointment.location}</p>
                          </div>
                          <div className="pt-2">
                            <Button variant="outline" size="sm">View Summary</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded-lg bg-white">
                  <p className="text-gray-500">No past appointments</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}