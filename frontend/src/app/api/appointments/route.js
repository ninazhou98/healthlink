import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    // Mock data for demonstration
    const appointments = [
      {
        id: "apt-001",
        type: "Annual Physical",
        doctor: "Johnson",
        date: "May 15, 2023",
        time: "10:00 AM",
        status: "Confirmed"
      },
      {
        id: "apt-002",
        type: "Dental Cleaning",
        doctor: "Martinez",
        date: "May 22, 2023",
        time: "2:30 PM",
        status: "Confirmed"
      },
      {
        id: "apt-003",
        type: "Eye Examination",
        doctor: "Williams",
        date: "June 5, 2023",
        time: "9:15 AM",
        status: "Pending"
      },
      {
        id: "apt-004",
        type: "Follow-up Consultation",
        doctor: "Johnson",
        date: "June 12, 2023",
        time: "11:45 AM",
        status: "Confirmed"
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