"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        // For demo purposes, just use the first patient
        setPatient(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 text-center">
            Loading profile...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Profile Summary Card */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback>{patient?.firstName?.charAt(0)}{patient?.lastName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{patient?.firstName} {patient?.lastName}</CardTitle>
                  <CardDescription>Patient ID: {patient?.patientId}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p>{patient?.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{patient?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{patient?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p>{patient?.address}</p>
                    <p>{patient?.city}, {patient?.state} {patient?.zipCode}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </CardFooter>
            </Card>

            {/* Profile Details Tabs */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="medical">Medical</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue={patient?.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue={patient?.lastName} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={patient?.email} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={patient?.phone} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={patient?.address} />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue={patient?.city} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue={patient?.state} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input id="zipCode" defaultValue={patient?.zipCode} />
                        </div>
                      </div>
                      
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medical" className="mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Input id="allergies" defaultValue={patient?.allergies || 'None'} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medications">Current Medications</Label>
                        <Input id="medications" defaultValue={patient?.medications || 'None'} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="conditions">Medical Conditions</Label>
                        <Input id="conditions" defaultValue={patient?.conditions || 'None'} />
                      </div>
                      
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="insurance" className="mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Input id="insuranceProvider" defaultValue={patient?.insuranceProvider || ''} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input id="policyNumber" defaultValue={patient?.policyNumber || ''} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input id="groupNumber" defaultValue={patient?.groupNumber || ''} />
                      </div>
                      
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}