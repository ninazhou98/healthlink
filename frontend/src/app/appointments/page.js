"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import Navigation from "@/components/navigation";

export default function AppointmentsPage() {
  const [appointments] = useState([
    { 
      id: 1, 
      doctor: "Dr. Sarah Smith", 
      specialty: "Cardiologist",
      date: "May 15, 2023", 
      time: "10:00 AM", 
      location: "Main Hospital, Room 302",
      status: "upcoming"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Johnson", 
      specialty: "Dermatologist",
      date: "May 22, 2023", 
      time: "2:30 PM", 
      location: "West Wing Clinic, Room 105",
      status: "upcoming"
    },
    { 
      id: 3, 
      doctor: "Dr. Emily Davis", 
      specialty: "General Practitioner",
      date: "April 30, 2023", 
      time: "9:15 AM", 
      location: "Main Hospital, Room 210",
      status: "past"
    }
  ]);

  const upcomingAppointments = appointments.filter(app => app.status === "upcoming");
  const pastAppointments = appointments.filter(app => app.status === "past");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-600">Appointments</h1>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Appointments</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule New
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center md:col-span-2">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center md:col-span-2">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">View Summary</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Navigation />
    </div>
  );
}