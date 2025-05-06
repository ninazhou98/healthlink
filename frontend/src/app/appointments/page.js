"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">HealthLink</h1>
          <p className="text-sm text-gray-500">Patient Communication Portal</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Schedule New Appointment
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                </div>
              ) : appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointments.map((appointment, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className={`h-2 ${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{appointment.type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.provider}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                            <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg border">
                  <p className="text-gray-500">No upcoming appointments</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Schedule Now</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              <div className="text-center py-8 bg-white rounded-lg border">
                <p className="text-gray-500">No past appointments to display</p>
              </div>
            </TabsContent>
            
            <TabsContent value="all">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                </div>
              ) : appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointments.map((appointment, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className={`h-2 ${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{appointment.type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.provider}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg border">
                  <p className="text-gray-500">No appointments found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}