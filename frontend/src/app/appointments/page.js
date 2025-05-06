"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Group appointments by status
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'past');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
            <p className="text-slate-500 mt-2">Manage your healthcare appointments</p>
          </header>

          <div className="mb-6 flex justify-between items-center">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="upcoming">
                  {loading ? (
                    <div className="grid gap-4">
                      {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-6">
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : upcomingAppointments.length > 0 ? (
                    <div className="grid gap-4">
                      {upcomingAppointments.map((appointment, index) => (
                        <AppointmentCard key={index} appointment={appointment} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-slate-500">No upcoming appointments</p>
                        <Button className="mt-4">Schedule New Appointment</Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                <TabsContent value="past">
                  {loading ? (
                    <div className="grid gap-4">
                      {[1, 2].map(i => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-6">
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : pastAppointments.length > 0 ? (
                    <div className="grid gap-4">
                      {pastAppointments.map((appointment, index) => (
                        <AppointmentCard key={index} appointment={appointment} isPast />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-slate-500">No past appointments</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a New Appointment</CardTitle>
                <CardDescription>Choose a time that works for you</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full sm:w-auto">Request Appointment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function AppointmentCard({ appointment, isPast = false }) {
  return (
    <Card className={isPast ? "opacity-75" : ""}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-md ${isPast ? 'bg-slate-100' : 'bg-blue-100'}`}>
              <Calendar className={`h-6 w-6 ${isPast ? 'text-slate-500' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className="font-medium text-lg">{appointment.type}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <Clock className="h-4 w-4" />
                <span>{appointment.date} at {appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{appointment.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <User className="h-4 w-4" />
                <span>Dr. {appointment.doctor}</span>
              </div>
            </div>
          </div>
          
          {!isPast && (
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-50">Cancel</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}