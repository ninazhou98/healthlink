import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would make a call to the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    // Mock data for demonstration
    const patient = {
      id: "12345678",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      dob: "1985-06-15",
      address: "123 Main Street, Anytown, CA 12345",
      insurance: "HealthPlus Insurance",
      policyNumber: "HP12345678",
      primaryCare: "Dr. Emily Davis"
    };
    
    return NextResponse.json({ patient });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    
    // In a real application, this would make a call to the Sikka API
    // https://api.sikkasoft.com/v4/patients
    
    return NextResponse.json({ 
      success: true, 
      message: "Patient information updated successfully",
      patient: {
        id: "12345678",
        ...data
      }
    });
  } catch (error) {
    console.error("Error updating patient data:", error);
    return NextResponse.json(
      { error: "Failed to update patient data" },
      { status: 500 }
    );
  }
}