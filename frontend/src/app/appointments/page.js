"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
              <p className="text-slate-500 mt-1">Manage your healthcare visits</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </header>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {appointments.slice(0, 3).map((appointment, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-md">
                              <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{appointment.type}</h3>
                              <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.date} at {appointment.time}</span>
                              </div>
                              <p className="text-slate-500 mt-1">Dr. {appointment.doctor}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 md:flex-col lg:flex-row">
                            <Button variant="outline">Reschedule</Button>
                            <Button variant="destructive">Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-100 p-3 rounded-md">
                          <Calendar className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Annual Physical</h3>
                          <div className="flex items-center gap-2 text-slate-500 mt-1">
                            <Clock className="h-4 w-4" />
                            <span>April 15, 2023 at 10:00 AM</span>
                          </div>
                          <p className="text-slate-500 mt-1">Dr. Johnson</p>
                        </div>
                      </div>
                      <Button variant="outline">View Summary</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-100 p-3 rounded-md">
                          <Calendar className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Dental Cleaning</h3>
                          <div className="flex items-center gap-2 text-slate-500 mt-1">
                            <Clock className="h-4 w-4" />
                            <span>March 3, 2023 at 2:30 PM</span>
                          </div>
                          <p className="text-slate-500 mt-1">Dr. Smith</p>
                        </div>
                      </div>
                      <Button variant="outline">View Summary</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}