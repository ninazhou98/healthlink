import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    // For demo purposes, we'll return mock data
    const mockPatients = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, CA 94000",
        dateOfBirth: "1985-06-15",
        insuranceProvider: "Blue Cross",
        insuranceNumber: "BC123456789"
      }
    ];

    return NextResponse.json(mockPatients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}