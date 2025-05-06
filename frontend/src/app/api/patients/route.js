import { NextResponse } from "next/server";

// Mock data for patient information
const mockPatient = {
  id: "12345",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1985-06-15",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345"
  },
  insurance: {
    provider: "HealthPlus Insurance",
    policyNumber: "HP987654321",
    groupNumber: "GRP123456"
  },
  medicalHistory: {
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "High Cholesterol"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" }
    ]
  }
};

export async function GET() {
  try {
    // In a real application, you would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For now, we'll return mock data
    return NextResponse.json(mockPatient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}