import { NextResponse } from "next/server";

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    type: "Annual Physical",
    doctor: "Dr. Sarah Johnson",
    date: "2023-06-15",
    time: "10:00 AM",
    location: "Main Clinic, Room 302",
    status: "confirmed"
  },
  {
    id: 2,
    type: "Cardiology Follow-up",
    doctor: "Dr. Michael Chen",
    date: "2023-06-22",
    time: "2:30 PM",
    location: "Cardiology Dept, Room 105",
    status: "confirmed"
  },
  {
    id: 3,
    type: "Dental Cleaning",
    doctor: "Dr. Emily Wilson",
    date: "2023-07-05",
    time: "9:15 AM",
    location: "Dental Office, Suite 4",
    status: "pending"
  }
];

export async function GET() {
  try {
    // In a real application, you would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/appointments', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For now, we'll return mock data
    return NextResponse.json(mockAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}