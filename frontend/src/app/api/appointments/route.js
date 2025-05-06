import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real app, we would fetch from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/appointments', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demo purposes, return mock data
    const mockAppointments = [
      { 
        id: 1, 
        date: "2023-05-15", 
        time: "10:00 AM", 
        doctor: "Dr. Smith", 
        type: "Check-up", 
        location: "Main Clinic",
        status: "confirmed"
      },
      { 
        id: 2, 
        date: "2023-05-22", 
        time: "2:30 PM", 
        doctor: "Dr. Johnson", 
        type: "Follow-up", 
        location: "North Branch",
        status: "confirmed"
      },
      { 
        id: 3, 
        date: "2023-04-10", 
        time: "11:15 AM", 
        doctor: "Dr. Smith", 
        type: "Annual Physical", 
        location: "Main Clinic",
        status: "completed"
      },
      { 
        id: 4, 
        date: "2023-03-05", 
        time: "9:00 AM", 
        doctor: "Dr. Williams", 
        type: "Consultation", 
        location: "Telehealth",
        status: "completed"
      }
    ];
    
    return NextResponse.json(mockAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}