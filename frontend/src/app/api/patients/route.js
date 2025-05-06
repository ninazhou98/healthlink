import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    // For demo purposes, we'll return mock data
    const mockPatient = {
      id: 12345,
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      address: {
        street: "123 Main Street",
        city: "Anytown",
        state: "CA",
        zipCode: "12345"
      },
      insurance: {
        provider: "HealthPlus Insurance",
        policyNumber: "HP-12345678",
        groupNumber: "GRP-987654"
      },
      medicalHistory: {
        allergies: ["Penicillin", "Peanuts"],
        chronicConditions: ["Hypertension"],
        currentMedications: ["Lisinopril 10mg", "Aspirin 81mg"]
      }
    };

    return NextResponse.json(mockPatient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}