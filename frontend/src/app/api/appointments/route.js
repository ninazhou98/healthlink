import { NextResponse } from 'next/server';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    type: "Annual Physical",
    doctor: "Sarah Johnson",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "confirmed"
  },
  {
    id: 2,
    type: "Cardiology Follow-up",
    doctor: "Michael Chen",
    date: "2023-06-22",
    time: "2:30 PM",
    status: "confirmed"
  },
  {
    id: 3,
    type: "Dental Cleaning",
    doctor: "Emily Rodriguez",
    date: "2023-07-05",
    time: "9:15 AM",
    status: "confirmed"
  },
  {
    id: 4,
    type: "Dermatology Consultation",
    doctor: "David Kim",
    date: "2023-05-10",
    time: "11:30 AM",
    status: "completed"
  },
  {
    id: 5,
    type: "Eye Examination",
    doctor: "Lisa Wong",
    date: "2023-04-20",
    time: "3:45 PM",
    status: "completed"
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
    
    // For demo purposes, we're using mock data
    return NextResponse.json(mockAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}