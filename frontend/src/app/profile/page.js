"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        // Assuming the first patient in the list is the current user
        setPatient(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Could not load patient data");
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">HealthLink</h1>
          <p className="text-sm text-gray-500">Patient Communication Portal</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading profile...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : patient ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="text-2xl">
                          {patient.firstName ? patient.firstName.charAt(0) : "P"}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 text-lg font-medium">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">Patient ID: {patient.id || "N/A"}</p>
                      <div className="mt-6 w-full">
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-500">{patient.email || "Not provided"}</p>
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-500">{patient.phone || "Not provided"}</p>
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-gray-500">{patient.dateOfBirth || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" defaultValue={patient.firstName || ""} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" defaultValue={patient.lastName || ""} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" defaultValue={patient.email || ""} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" defaultValue={patient.phone || ""} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="dob">Date of Birth</Label>
                              <Input id="dob" defaultValue={patient.dateOfBirth || ""} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="gender">Gender</Label>
                              <Input id="gender" defaultValue={patient.gender || ""} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" defaultValue={patient.address || ""} />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" defaultValue={patient.city || ""} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" defaultValue={patient.state || ""} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">Zip Code</Label>
                              <Input id="zipCode" defaultValue={patient.zipCode || ""} />
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="medical">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Medical Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4">
                          Your medical information is private and secure. Only you and your healthcare providers can access this data.
                        </p>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Allergies</h4>
                            <p className="text-sm text-gray-500">No known allergies</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Current Medications</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-500">
                              <li>Lisinopril 10mg - Once daily</li>
                              <li>Metformin 500mg - Twice daily</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Medical Conditions</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-500">
                              <li>Hypertension - Diagnosed 2018</li>
                              <li>Type 2 Diabetes - Diagnosed 2019</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button variant="outline">Request Changes</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="insurance">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Insurance Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                              <Input id="insuranceProvider" defaultValue="Blue Cross Blue Shield" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policyNumber">Policy Number</Label>
                              <Input id="policyNumber" defaultValue="XYZ123456789" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="groupNumber">Group Number</Label>
                              <Input id="groupNumber" defaultValue="GRP987654321" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policyHolder">Policy Holder</Label>
                              <Input id="policyHolder" defaultValue={`${patient.firstName} ${patient.lastName}`} />
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Communication Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Appointment Reminders</h4>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="emailReminders" className="rounded text-blue-600" defaultChecked />
                              <Label htmlFor="emailReminders">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <input type="checkbox" id="smsReminders" className="rounded text-blue-600" defaultChecked />
                              <Label htmlFor="smsReminders">SMS/Text Message</Label>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Notifications</h4>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="newMessages" className="rounded text-blue-600" defaultChecked />
                              <Label htmlFor="newMessages">New Messages</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <input type="checkbox" id="labResults" className="rounded text-blue-600" defaultChecked />
                              <Label htmlFor="labResults">Lab Results Available</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <input type="checkbox" id="prescriptionUpdates" className="rounded text-blue-600" defaultChecked />
                              <Label htmlFor="prescriptionUpdates">Prescription Updates</Label>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg border">
              <p className="text-gray-500">No patient data available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}