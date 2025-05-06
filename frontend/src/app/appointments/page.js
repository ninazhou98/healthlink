"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
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

  // Filter appointments by status
  const upcomingAppointments = appointments.filter(app => new Date(app.date) >= new Date());
  const pastAppointments = appointments.filter(app => new Date(app.date) < new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="text-center py-10">Loading appointments...</div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <AppointmentCard key={index} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">Schedule a new appointment to get started.</p>
                  <div className="mt-6">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {loading ? (
                <div className="text-center py-10">Loading appointments...</div>
              ) : pastAppointments.length > 0 ? (
                <div className="grid gap-4">
                  {pastAppointments.map((appointment, index) => (
                    <AppointmentCard key={index} appointment={appointment} isPast />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No past appointments</h3>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function AppointmentCard({ appointment, isPast = false }) {
  return (
    <Card className={isPast ? "opacity-75" : ""}>
      <CardHeader className="pb-2">
        <CardTitle>{appointment.type}</CardTitle>
        <CardDescription>With Dr. {appointment.doctor}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-sm">{appointment.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        
        {!isPast && (
          <div className="mt-4 flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
            <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}