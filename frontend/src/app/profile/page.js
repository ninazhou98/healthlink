"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch('/api/patients');
        const data = await response.json();
        if (data && data.length > 0) {
          setPatient(data[0]); // Use the first patient for demo
          setFormData({
            firstName: data[0].firstName || "",
            lastName: data[0].lastName || "",
            email: data[0].email || "",
            phone: data[0].phone || "",
            address: data[0].address || "",
            city: data[0].city || "",
            state: data[0].state || "",
            zipCode: data[0].zipCode || "",
            dateOfBirth: data[0].dateOfBirth || "",
            emergencyContact: data[0].emergencyContact || "",
            emergencyPhone: data[0].emergencyPhone || ""
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Use mock data if API fails
        const mockPatient = {
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
        };
        setPatient(mockPatient);
        setFormData({
          firstName: mockPatient.firstName,
          lastName: mockPatient.lastName,
          email: mockPatient.email,
          phone: mockPatient.phone,
          address: mockPatient.address,
          city: mockPatient.city,
          state: mockPatient.state,
          zipCode: mockPatient.zipCode,
          dateOfBirth: mockPatient.dateOfBirth,
          emergencyContact: mockPatient.emergencyContact,
          emergencyPhone: mockPatient.emergencyPhone
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    console.log("Saving profile data:", formData);
    
    // Update local state
    setPatient(prev => ({
      ...prev,
      ...formData
    }));
    
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
          <p className="text-sm text-gray-500">Your healthcare connection</p>
        </header>
        <div className="flex flex-1">
          <Navigation />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <p className="text-gray-500">Loading profile data...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        <p className="text-sm text-gray-500">Your healthcare connection</p>
      </header>

      <div className="flex flex-1">
        <Navigation />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Patient Profile</h2>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="personal">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input 
                            id="dateOfBirth" 
                            name="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            name="state" 
                            value={formData.state} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input 
                            id="zipCode" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-lg mt-6">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Name</Label>
                          <Input 
                            id="emergencyContact" 
                            name="emergencyContact" 
                            value={formData.emergencyContact} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Phone</Label>
                          <Input 
                            id="emergencyPhone" 
                            name="emergencyPhone" 
                            value={formData.emergencyPhone} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{patient.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{patient.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{patient.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">
                            {patient.address}, {patient.city}, {patient.state} {patient.zipCode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium text-lg mb-2">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{patient.emergencyContact}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{patient.emergencyPhone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insurance">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Provider</p>
                      <p className="font-medium">{patient.insurance?.provider}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Policy Number</p>
                        <p className="font-medium">{patient.insurance?.policyNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Group Number</p>
                        <p className="font-medium">{patient.insurance?.groupNumber}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coverage Type</p>
                      <p className="font-medium">{patient.insurance?.coverageType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                    <div className="space-y-4">
                      {patient.medicalHistory.map((item, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.condition}</h3>
                            <span className="text-sm text-gray-500">Diagnosed: {item.diagnosedYear}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No medical history records available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}