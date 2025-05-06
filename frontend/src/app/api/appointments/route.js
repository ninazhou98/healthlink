import { NextResponse } from 'next/server';

// Mock data for appointments
const appointments = [
  {
    id: 1,
    type: "Annual Physical",
    date: "May 15, 2023",
    time: "10:00 AM",
    doctor: "Sarah Johnson",
    location: "Main Clinic, Room 302",
    status: "upcoming"
  },
  {
    id: 2,
    type: "Dental Cleaning",
    date: "May 22, 2023",
    time: "2:30 PM",
    doctor: "Michael Chen",
    location: "Dental Office, Suite 105",
    status: "upcoming"
  },
  {
    id: 3,
    type: "Dermatology Consultation",
    date: "June 3, 2023",
    time: "11:15 AM",
    doctor: "Emily Rodriguez",
    location: "Specialty Clinic, Room 204",
    status: "upcoming"
  },
  {
    id: 4,
    type: "Follow-up Visit",
    date: "April 10, 2023",
    time: "9:00 AM",
    doctor: "Sarah Johnson",
    location: "Main Clinic, Room 302",
    status: "past"
  },
  {
    id: 5,
    type: "Blood Test",
    date: "March 28, 2023",
    time: "8:30 AM",
    doctor: "James Wilson",
    location: "Lab Services, Floor 1",
    status: "past"
  }
];

export async function GET() {
  // In a real application, this would fetch from the Sikka API endpoint
  // https://api.sikkasoft.com/v4/appointments
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}