import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would fetch data from the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    // Mock data for demonstration
    const patients = [
      {
        id: "pat-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "(555) 123-4567",
        dob: "04/12/1985",
        address: "123 Main St, Anytown, CA 94123",
        insurance: "Blue Cross Blue Shield",
        allergies: "Penicillin, Peanuts",
        medications: ["Lisinopril 10mg", "Vitamin D 2000 IU"],
        procedures: ["Appendectomy (2018)", "Knee Arthroscopy (2020)"]
      }
    ];

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}