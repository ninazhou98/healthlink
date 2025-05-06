"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { useEffect } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    }
    
    fetchAppointments();
  }, []);
  
  // Mock appointment data for UI display
  const upcomingAppointments = [
    { id: 1, date: "May 15, 2023", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up", location: "Main Clinic" },
    { id: 2, date: "May 22, 2023", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up", location: "North Branch" }
  ];
  
  const pastAppointments = [
    { id: 3, date: "April 10, 2023", time: "11:15 AM", doctor: "Dr. Smith", type: "Annual Physical", location: "Main Clinic" },
    { id: 4, date: "March 5, 2023", time: "9:00 AM", doctor: "Dr. Williams", type: "Consultation", location: "Telehealth" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r border-gray-200">
          <Navigation />
        </aside>
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointments</h2>
            <p className="text-gray-600">Manage your upcoming and past appointments</p>
          </div>
          
          <div className="mb-6">
            <Button>Schedule New Appointment</Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.map(appointment => (
                <Card key={appointment.id} className="mb-4">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex items-start space-x-4 mb-4 md:mb-0">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.type}</h3>
                          <p className="text-gray-600">{appointment.doctor}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end">
                        <div className="flex items-center mb-2">
                          <Calendar size={16} className="mr-1 text-gray-500" />
                          <span className="text-gray-800">{appointment.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1 text-gray-500" />
                          <span className="text-gray-800">{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAppointments.map(appointment => (
                <Card key={appointment.id} className="mb-4">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex items-start space-x-4 mb-4 md:mb-0">
                        <div className="bg-gray-100 text-gray-600 rounded-full p-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.type}</h3>
                          <p className="text-gray-600">{appointment.doctor}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end">
                        <div className="flex items-center mb-2">
                          <Calendar size={16} className="mr-1 text-gray-500" />
                          <span className="text-gray-800">{appointment.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1 text-gray-500" />
                          <span className="text-gray-800">{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">View Summary</Button>
                      <Button variant="outline" size="sm">Book Follow-up</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}