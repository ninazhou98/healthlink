"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"
import axios from "axios"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // In a real app, this would call the API endpoint
        // const response = await axios.get('/api/appointments')
        // setAppointments(response.data)
        
        // Using mock data for demonstration
        setAppointments([
          {
            id: 1,
            date: "2023-06-15",
            time: "10:00 AM",
            doctor: "Dr. Sarah Johnson",
            type: "Annual Check-up",
            location: "Main Clinic, Room 204",
            status: "confirmed"
          },
          {
            id: 2,
            date: "2023-06-22",
            time: "2:30 PM",
            doctor: "Dr. Michael Chen",
            type: "Follow-up",
            location: "North Wing, Room 118",
            status: "confirmed"
          },
          {
            id: 3,
            date: "2023-07-05",
            time: "11:15 AM",
            doctor: "Dr. Emily Rodriguez",
            type: "Consultation",
            location: "Specialty Center, Room 305",
            status: "pending"
          }
        ])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        setLoading(false)
      }
    }
    
    fetchAppointments()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">HL</span>
            </div>
            <span className="font-bold text-xl">HealthLink</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Navigation />
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <Button>Schedule New Appointment</Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {loading ? (
              <div className="text-center py-10">Loading appointments...</div>
            ) : (
              <div className="grid gap-4">
                {appointments
                  .filter(apt => apt.status === "confirmed")
                  .map(appointment => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.type}</h3>
                            <p className="text-muted-foreground">{appointment.doctor}</p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>{appointment.date}</span>
                              <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4 md:mt-0">
                            <Button variant="outline">Reschedule</Button>
                            <Button variant="outline" className="text-red-500 hover:text-red-600">Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="text-center py-10 text-muted-foreground">
              No past appointments to display
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            {loading ? (
              <div className="text-center py-10">Loading appointments...</div>
            ) : (
              <div className="grid gap-4">
                {appointments
                  .filter(apt => apt.status === "pending")
                  .map(appointment => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-lg">{appointment.type}</h3>
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                            </div>
                            <p className="text-muted-foreground">{appointment.doctor}</p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>{appointment.date}</span>
                              <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4 md:mt-0">
                            <Button variant="outline" className="text-red-500 hover:text-red-600">Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}