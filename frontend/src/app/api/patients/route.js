import { NextResponse } from 'next/server';

// Mock data for patients
const mockPatients = [
  {
    patientId: "P12345",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1985-07-15",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    allergies: "Penicillin",
    medications: "Lisinopril, Metformin",
    conditions: "Hypertension, Type 2 Diabetes",
    insuranceProvider: "Blue Cross Blue Shield",
    policyNumber: "BCB12345678",
    groupNumber: "GRP987654"
  }
];

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demo purposes, we're using mock data
    return NextResponse.json(mockPatients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}