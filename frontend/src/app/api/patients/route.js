import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, you would fetch data from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demo purposes, return mock data
    const mockPatients = [
      {
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "(555) 123-4567",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        dateOfBirth: "1985-06-15",
        emergencyContact: "John Doe",
        emergencyPhone: "(555) 987-6543",
        insurance: {
          provider: "HealthPlus Insurance",
          policyNumber: "HP12345678",
          groupNumber: "GP987654",
          coverageType: "PPO"
        },
        medicalHistory: [
          { condition: "Asthma", diagnosedYear: "2010", notes: "Mild, controlled with inhaler" },
          { condition: "Allergies", diagnosedYear: "2008", notes: "Seasonal, pollen" }
        ]
      }
    ];
    
    return NextResponse.json(mockPatients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}