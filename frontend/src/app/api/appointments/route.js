import { NextResponse } from "next/server";

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    type: "Annual Physical",
    date: "May 15, 2023",
    time: "10:00 AM",
    doctor: "Sarah Johnson",
    status: "confirmed"
  },
  {
    id: 2,
    type: "Dental Cleaning",
    date: "May 22, 2023",
    time: "2:30 PM",
    doctor: "Michael Chen",
    status: "confirmed"
  },
  {
    id: 3,
    type: "Eye Examination",
    date: "June 5, 2023",
    time: "9:15 AM",
    doctor: "Robert Williams",
    status: "pending"
  }
];

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/appointments', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For now, return mock data
    return NextResponse.json(mockAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}