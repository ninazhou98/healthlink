import { NextResponse } from "next/server";

// Mock data for patient information
const mockPatient = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1985-06-15",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC1234567",
    groupNumber: "GRP987654"
  },
  medicalConditions: [],
  medications: [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily"
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily"
    }
  ],
  allergies: ["Penicillin", "Peanuts"]
};

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For now, return mock data
    return NextResponse.json(mockPatient);
  } catch (error) {
    console.error("Error fetching patient information:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient information" },
      { status: 500 }
    );
  }
}