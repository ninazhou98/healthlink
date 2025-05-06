import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would make a call to the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    // Mock data for demonstration
    const appointments = [
      { 
        id: 1, 
        doctor: "Dr. Sarah Smith", 
        specialty: "Cardiologist",
        date: "May 15, 2023", 
        time: "10:00 AM", 
        location: "Main Hospital, Room 302",
        status: "upcoming"
      },
      { 
        id: 2, 
        doctor: "Dr. Michael Johnson", 
        specialty: "Dermatologist",
        date: "May 22, 2023", 
        time: "2:30 PM", 
        location: "West Wing Clinic, Room 105",
        status: "upcoming"
      },
      { 
        id: 3, 
        doctor: "Dr. Emily Davis", 
        specialty: "General Practitioner",
        date: "April 30, 2023", 
        time: "9:15 AM", 
        location: "Main Hospital, Room 210",
        status: "past"
      }
    ];
    
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // In a real application, this would make a call to the Sikka API
    // https://api.sikkasoft.com/v4/appointments
    
    return NextResponse.json({ 
      success: true, 
      message: "Appointment scheduled successfully",
      appointment: {
        id: 4,
        ...data,
        status: "upcoming"
      }
    });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    return NextResponse.json(
      { error: "Failed to schedule appointment" },
      { status: 500 }
    );
  }
}