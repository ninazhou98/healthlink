import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    // In a production environment, this would call the Sikka API
    // const response = await axios.get('https://api.sikkasoft.com/v4/appointments')
    // return NextResponse.json(response.data)
    
    // For demonstration, return mock data
    return NextResponse.json([
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
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
}