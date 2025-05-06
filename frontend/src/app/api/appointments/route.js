import { NextResponse } from "next/server";

// Mock data for appointments
// In a real application, this would connect to the Sikka API endpoint:
// https://api.sikkasoft.com/v4/appointments
export async function GET() {
  try {
    // Mock appointment data
    const appointments = [
      {
        id: 1,
        type: "Annual Physical",
        date: "May 15, 2023",
        time: "10:00 AM",
        doctor: "Smith",
        location: "Main Clinic"
      },
      {
        id: 2,
        type: "Dental Cleaning",
        date: "May 22, 2023",
        time: "2:30 PM",
        doctor: "Johnson",
        location: "Dental Office"
      },
      {
        id: 3,
        type: "Eye Exam",
        date: "June 5, 2023",
        time: "9:15 AM",
        doctor: "Williams",
        location: "Vision Center"
      },
      {
        id: 4,
        type: "Follow-up Visit",
        date: "June 12, 2023",
        time: "11:30 AM",
        doctor: "Brown",
        location: "Main Clinic"
      }
    ];

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}