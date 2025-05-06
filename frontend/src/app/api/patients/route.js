import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real app, we would fetch from the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demo purposes, return mock data
    const mockPatients = [
      {
        id: "123456",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "(555) 123-4567",
        dob: "1985-06-15",
        address: "123 Main St, Anytown, CA 12345",
        insurance: {
          provider: "Blue Cross Blue Shield",
          policyNumber: "BCBS-12345678",
          groupNumber: "GRP-987654"
        },
        emergencyContact: {
          name: "Michael Johnson",
          relationship: "Spouse",
          phone: "(555) 987-6543"
        }
      }
    ];
    
    return NextResponse.json(mockPatients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}