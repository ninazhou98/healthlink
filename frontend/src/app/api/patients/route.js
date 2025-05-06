import { NextResponse } from 'next/server';

// Mock data for patients
const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    dateOfBirth: "1980-05-15",
    allergies: "Penicillin, Peanuts",
    medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
    conditions: ["Hypertension", "High Cholesterol"],
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC1234567",
      groupNumber: "GRP987654",
      policyHolder: "John Doe"
    }
  }
];

export async function GET() {
  // In a real application, this would fetch from the Sikka API endpoint
  // https://api.sikkasoft.com/v4/patients
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}