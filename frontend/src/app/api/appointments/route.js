import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    // For demo purposes, we'll return mock data
    const mockAppointments = [
      {
        id: 1,
        type: "Annual Physical",
        date: "2023-06-15",
        time: "10:00 AM",
        doctor: "Sarah Johnson",
        location: "Main Clinic, Room 302",
        status: "confirmed"
      },
      {
        id: 2,
        type: "Dental Cleaning",
        date: "2023-06-22",
        time: "2:30 PM",
        doctor: "Robert Chen",
        location: "Dental Wing, Room 105",
        status: "confirmed"
      },
      {
        id: 3,
        type: "Cardiology Follow-up",
        date: "2023-07-05",
        time: "11:15 AM",
        doctor: "Michael Chen",
        location: "Cardiology Dept, Room 210",
        status: "pending"
      },
      {
        id: 4,
        type: "Blood Test",
        date: "2023-05-10",
        time: "8:30 AM",
        doctor: "Emma Wilson",
        location: "Lab Services, Room 110",
        status: "completed"
      },
      {
        id: 5,
        type: "Vaccination",
        date: "2023-04-20",
        time: "3:00 PM",
        doctor: "James Miller",
        location: "Immunization Clinic, Room 105",
        status: "completed"
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