import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    // For demo purposes, we'll return mock data
    const mockAppointments = [
      {
        id: 1,
        type: "Annual Physical",
        date: "May 15, 2023",
        time: "10:00 AM",
        doctor: "Dr. Sarah Johnson",
        status: "confirmed",
        location: "Main Clinic"
      },
      {
        id: 2,
        type: "Dental Cleaning",
        date: "May 22, 2023",
        time: "2:30 PM",
        doctor: "Dr. Robert Chen",
        status: "confirmed",
        location: "Dental Office"
      },
      {
        id: 3,
        type: "Follow-up Consultation",
        date: "June 5, 2023",
        time: "11:15 AM",
        doctor: "Dr. Sarah Johnson",
        status: "pending",
        location: "Main Clinic"
      }
    ];

    return NextResponse.json(mockAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}