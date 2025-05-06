import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this would make a call to the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/appointments', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demonstration, we'll return mock data
    const mockAppointments = [
      {
        id: 1,
        type: "Annual Physical",
        date: "May 15, 2023",
        time: "10:00 AM",
        provider: "Dr. Sarah Smith",
        location: "Main Clinic - Room 102",
        status: "confirmed"
      },
      {
        id: 2,
        type: "Dental Cleaning",
        date: "May 22, 2023",
        time: "2:30 PM",
        provider: "Dr. James Wilson",
        location: "Dental Office - Suite 305",
        status: "scheduled"
      },
      {
        id: 3,
        type: "Eye Examination",
        date: "June 5, 2023",
        time: "9:15 AM",
        provider: "Dr. Emily Chen",
        location: "Vision Center - Room 204",
        status: "confirmed"
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