import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    // In a production environment, this would call the Sikka API
    // const response = await axios.get('https://api.sikkasoft.com/v4/patients')
    // return NextResponse.json(response.data)
    
    // For demonstration, return mock data
    return NextResponse.json([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        dateOfBirth: "1985-06-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        insurance: {
          provider: "HealthPlus Insurance",
          policyNumber: "HP12345678",
          groupNumber: "GP987654",
          effectiveDate: "2023-01-01"
        },
        emergencyContact: {
          name: "Jane Doe",
          relationship: "Spouse",
          phone: "(555) 987-6543"
        }
      }
    ])
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    )
  }
}