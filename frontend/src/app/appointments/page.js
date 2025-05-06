"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Use mock data if API fails
        setAppointments([
          { id: 1, date: "2023-05-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up", status: "upcoming" },
          { id: 2, date: "2023-05-22", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up", status: "upcoming" },
          { id: 3, date: "2023-04-10", time: "9:15 AM", doctor: "Dr. Williams", type: "Annual Physical", status: "past" },
          { id: 4, date: "2023-03-05", time: "11:30 AM", doctor: "Dr. Brown", type: "Consultation", status: "past" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(app => app.status === "upcoming");
  const pastAppointments = appointments.filter(app => app.status === "past");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        <p className="text-sm text-gray-500">Your healthcare connection</p>
      </header>

      <div className="flex flex-1">
        <Navigation />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Appointments</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-gray-500">Loading appointments...</p>
                  ) : upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{appointment.type}</h3>
                              <p className="text-gray-600">{appointment.doctor}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-blue-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">{appointment.date}</span>
                              </div>
                              <div className="flex items-center text-gray-600 mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No upcoming appointments</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-gray-500">Loading appointments...</p>
                  ) : pastAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{appointment.type}</h3>
                              <p className="text-gray-600">{appointment.doctor}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">{appointment.date}</span>
                              </div>
                              <div className="flex items-center text-gray-600 mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm">View Summary</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No past appointments</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}