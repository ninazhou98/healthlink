import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this would make a call to the Sikka API
    // const response = await fetch('https://api.sikkasoft.com/v4/patients', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SIKKA_API_KEY}`
    //   }
    // });
    // const data = await response.json();
    
    // For demonstration, we'll return mock data
    const mockPatients = [
      {
        id: "P12345",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        dateOfBirth: "01/15/1980",
        gender: "Male",
        address: "123 Main Street",
        city: "Anytown",
        state: "CA",
        zipCode: "12345"
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