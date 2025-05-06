import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    // Mock data for demonstration
    const appointments = [
      {
        id: 1,
        type: "Annual Physical",
        date: "June 15, 2023",
        time: "10:00 AM",
        doctor: "Johnson",
        location: "Main Clinic",
        status: "Confirmed"
      },
      {
        id: 2,
        type: "Dental Cleaning",
        date: "June 22, 2023",
        time: "2:30 PM",
        doctor: "Smith",
        location: "Dental Office",
        status: "Confirmed"
      },
      {
        id: 3,
        type: "Eye Exam",
        date: "July 5, 2023",
        time: "1:15 PM",
        doctor: "Garcia",
        location: "Vision Center",
        status: "Pending"
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