import { NextResponse } from "next/server";

// Mock data for patient information
// In a real application, this would connect to the Sikka API endpoint:
// https://api.sikkasoft.com/v4/patients
export async function GET() {
  try {
    // Mock patient data
    const patient = {
      id: 12345,
      name: "John Smith",
      dob: "05/12/1985",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, CA 12345",
      emergencyContact: "Jane Smith - (555) 987-6543",
      insurance: {
        provider: "HealthPlus Insurance",
        policyNumber: "HP-987654321",
        groupNumber: "GRP-12345"
      },
      allergies: ["Penicillin", "Peanuts"],
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" }
      ],
      medicalHistory: [
        { condition: "Hypertension", diagnosedYear: 2018, status: "Active" },
        { condition: "Appendectomy", diagnosedYear: 2010, status: "Resolved" }
      ],
      vitals: {
        bloodPressure: "120/80",
        heartRate: 72,
        weight: 175,
        height: "5'10\"",
        bmi: 25.1
      },
      labResults: {
        cholesterolTotal: 185,
        hdl: 55,
        ldl: 110,
        glucose: 92
      }
    };

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}