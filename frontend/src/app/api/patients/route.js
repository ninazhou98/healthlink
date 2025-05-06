import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    // Mock data for demonstration
    const patients = [
      {
        id: 1,
        firstName: "Sarah",
        lastName: "Johnson",
        dateOfBirth: "05/12/1985",
        gender: "Female",
        email: "sarah.johnson@example.com",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, CA 12345",
        insuranceProvider: "Blue Cross Blue Shield",
        insurancePolicyNumber: "XYZ123456789"
      }
    ];

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}